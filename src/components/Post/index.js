import React, { Component } from 'react';
import type from 'prop-types';

import moment from 'moment';

import TryCatch from './onerror';

import Styles from './styles.scss';

import Config from '../../config';

export default class Post extends Component {
    static propTypes = {
        lastname:   type.string.isRequired,
        firstname:  type.string.isRequired,
        postdata:   type.string.isRequired,
        removePost: type.func.isRequired,
        postid:     type.string.isRequired,
        avatar:     type.string.isRequired,
        liked:      type.bool
    }

    state = {
        likes:   [],
        isLiked: this.props.liked
    }

    static contextTypes = {
        avatar: type.string.isRequired
    }

    /**
     * @returns {number} 1 - Поставил, 0 - снял
     */
    toggleLike = () => {
        const likes = this.state.likes.concat([]);
        const me = {
            firstName: this.props.firstname,
            lastName:  this.props.lastname
        };

        for (const el in likes) {
            if (likes[el].firstName === me.firstName && likes[el].lastName === me.lastName) {
                likes.splice(el, 1);

                this.setState({
                    likes
                });

                return;
            }
        }

        likes.push(me);

        this.setState({
            likes
        });

        return 0;
    }

    shouldComponentUpdate (nextProps) {
        if (JSON.stringify(this.props) === JSON.stringify(nextProps)) {
            return false;
        }
    }

    removeRemote = (id) => {
        fetch(
            `${Config.api}${Config.group_id}/${id}`,
            {
                method:  'DELETE',
                headers: {
                    Authorization:  Config.token,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                if (response.status !== 204) {
                    alert(response.status);
                }
            });
    }

    remove = () => {
        const id = this.props.postid;

        this.props.removePost(id);
        this.removeRemote(id);
    }

    render () {
        // const { avatar } = this.context;
        const { firstname, lastname, postdata, avatar, date } = this.props;

        // throw new Error(1);

        return (
            <TryCatch>
                <section className = { Styles.post }>
                    <div className = { Styles.cross } onClick = { this.remove } />
                    <img src = { avatar } />
                    <a>{firstname} {lastname}</a>
                    <time>{date}</time>
                    <p>{postdata}</p>
                </section>
            </TryCatch>
        );

        //{moment().format('MMMM D h:mm:ss a')}
    }
}
