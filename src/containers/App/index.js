// Core
import React, { Component } from 'react';
import type from 'prop-types';

// Instruments
import Styles from './styles.scss';
import avatar from '../../theme/assets/homer.png';

import Feed from '../../components/Feed';
import TryCatch from './onerror';

const options = {
    firstname: 'Илья',
    lastname:  'Клюев',
    avatar
};

export default class App extends Component {
    getChildContext () {
        return {
            firstname: options.firstname,
            avatar:    options.avatar
        };
    }

    static childContextTypes = {
        avatar:    type.string,
        firstname: type.string
    }

    render () {
        return (
            <section className = { Styles.app }>
                <h1>Facebook killer!</h1>
                <TryCatch>
                    <Feed { ...options } />
                </TryCatch>
                <p />
            </section>
        );
    }
}
