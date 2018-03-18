import React, { Component } from 'react';
// import type from 'prop-types';

import Styles from './styles.scss';

export default class TryCatch extends Component {
 state = {
     isError: false
 }

 // TODO: Validate props

 componentDidCatch (error, stack) {
     console.error(error, stack);
     this.setState({
         isError: true
     });
 }

 render () {
     if (!this.state.isError) {
         return this.props.children;
     }

     return (
         <section className = { Styles.composer }>
             <img src = 'https://openclipart.org/download/177394/1366695174.svg' className = { Styles.composer.avatar } alt = 'avatar' />
             <form onSubmit = { this.handleSubmit }>
                 <h2>You shall not submit this post</h2>
                 <input type = 'submit' value = 'Post' disabled style = { { background: 'red' } } />
             </form>
         </section>
     );
 }
}
