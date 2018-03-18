import React, { Component } from 'react';
import type from 'prop-types';
import io from 'socket.io-client';

import Composer from '../../components/Composer';
import Post from '../../components/Post';
import PostClass from '../../components/Post/Post';

import ComposerTryCatch from '../Composer/onerror';
import PostTryCatch from '../Post/onerror';
import Config from '../../config';

export default class Feed extends Component {
    static propTypes = {
        firstname: type.string.isRequired,
        lastname:  type.string.isRequired,
        avatar:    type.string.isRequired
    };

    state = {
        posts: []
    }

    /* 
    "{
    "message": "the request has succeeded",
    "data": [
        {
            "likes": [],
            "comment": "Hello world!",
            "created": 1521388712,
            "id": "5aae8ca8a2c0906faf0ce976",
            "firstName": "Антон",
            "lastName": "Березенский",
            "avatar": "https://lab.lectrum.io/react/api/image/1fwfsc9M9A/placeholder.jpg"
        }
    ],
    "meta": {
        "total": 1,
        "page": 1,
        "size": 40
    }
}"
    */

    loadPosts = () => {
        fetch(`${Config.api}${Config.group_id}`)
            .then((responce) => {
                if (responce.status !== 200) {
                    alert(`status: ${responce.status}`);
                }

                return responce.json();
            })
            .then((obj) => {

                const data = obj.data.reverse();

                for (const cur of data) {
                    this.createPost(new PostClass(
                        {
                            firstname: cur.firstName,
                            lastname:  cur.lastName,
                            postdata:  cur.comment,
                            postid:    cur.id,
                            avatar:    cur.avatar,
                            date:      cur.created
                        }));
                }
            });
    }

    componentDidMount = () => {
        const socket = io('https://lab.lectrum.io', {
            path: '/react/ws'
        });

        socket.on('connect', () => {
            console.log(`Подключил сокет с id: ${socket.id}`);
        });

        socket.on('disconnect', () => {
            console.error(`Сокет отвалился!`);
        });

        socket.emit('join', Config.group_id);

        socket.on('join_error', (response) => {
            const message = JSON.parse(response);

            alert(`Ошибка входа: ${message.message}`);
            console.log(message);
        });

        socket.on('create', (json) => {
            const post = JSON.parse(json).data;


            this.createPost(new PostClass(
                {
                    firstname: post.firstName,
                    lastname:  post.lastName,
                    postdata:  post.comment,
                    postid:    post.id,
                    avatar:    post.avatar,
                    date:      post.created
                }
            ));
        });

        this.loadPosts();
    }

    createPost = (post) => {
        if (!(post instanceof PostClass)) {
            throw new TypeError('Что Вы хотите создать с помощью createPost? Я ожидаю new Post))');
        }
        this.setState((prev) => ({
            posts: [post, ...prev.posts]
        }));
    }

    removePost = (id) => {
        this.setState((prevState) => ({
            posts: prevState.posts.filter(
                (el) => el.postid !== id
            )
        }));
        this.loadPosts();
    }

    render () {
        const { firstname, lastname, avatar } = this.props;
        const { posts } = this.state;

        // throw new Error(1);

        const postsHtml = posts.map(
            (el) => (
                <PostTryCatch
                    key = { el.postid }>
                    <Post
                        postid = { el.postid }
                        firstname = { el.firstname }
                        lastname = { el.lastname }
                        postdata = { el.postdata }
                        removePost = { this.removePost }
                        avatar = { el.avatar }
                        date = { el.date }
                    />
                </PostTryCatch>
            )
        );

        return (
            <section>
                <ComposerTryCatch>
                    <Composer firstname = { firstname } avatar = { avatar } lastname = { lastname } createPost = { this.createPost } />
                </ComposerTryCatch>
                {postsHtml}
            </section>
        );
    }
}
