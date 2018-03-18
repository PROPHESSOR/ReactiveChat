import React, { Component } from 'react';
import type from 'prop-types';

import Styles from './styles.scss';

import PostClass from '../../components/Post/Post';
import { getUniqueID, getRandomColorRGB } from '../../helpers/';
import Config from '../../config';

export default class Composer extends Component {
    static propTypes = {
        firstname:  type.string.isRequired,
        lastname:   type.string.isRequired,
        createPost: type.func.isRequired,
        avatar:     type.string.isRequired
    }

    static contextTypes = {
        avatar: type.string.isRequired
    }

    sendPost = (comment) => {
        fetch(
            `${Config.api}${Config.group_id}`,
            {
                method:  'POST',
                headers: {
                    Authorization:  Config.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment })
            }
        )
            .then((responce) => {
                if (responce.status !== 200) {
                    alert(`status: ${responce.status}`);
                }
                // alert('Ok');
            });

    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { firstname, lastname, avatar } = this.props;
        const { comment } = this.state;
        const postid = getUniqueID();

        if (!comment.trim()) {
            return false;
        }

        // this.props.createPost(new PostClass({ firstname, lastname, postdata: comment, postid, avatar }));
        this.sendPost(comment);
        this.setState({
            comment: ''
        });
    }

    handleTextAreaChange = (event) => {
        const { target: { value }} = event;

        this.setState({
            comment: value
        });
    }

    hanleKeyDown = (event) => {
        this.setState({
            abc: getRandomColorRGB()
        });
        if (event.keyCode === 13/*  && event.ctrlKey */) {
            this.handleSubmit(event);
        }
    }

    handleCopyCut = (event) => {
        event.preventDefault();
    }

    state = {
        comment: '',
        abc:     getRandomColorRGB() //Avatar Border Color
    }

    render () {
        const { avatar } = this.context;
        const { firstname } = this.props;
        const { comment } = this.state;

        // throw new Error(1);

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } className = { Styles.composer.avatar } style = { { borderColor: this.state.abc } } alt = 'avatar' />
                <form onKeyDown = { this.hanleKeyDown } onSubmit = { this.handleSubmit }>
                    <textarea autoFocus onCut = { this.handleCopyCut } onCopy = { this.handleCopyCut } value = { comment } onChange = { this.handleTextAreaChange } placeholder = { `What's on your mind, ${firstname}?` } />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
