import React, { Component } from 'react';
import Styles from './styles.scss';

export default class TryCatch extends Component {
 state = {
     isError: false
 }

 // TODO: Validate props

 componentWillReceiveProps (newprops) {
     if (newprops.isError) {
         this.setState({ isError: true });
     }
 }

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
         <section className = { Styles.post }>
             <div className = { Styles.cross } onClick = { this.remove } />
             <img src = 'https://openclipart.org/download/177394/1366695174.svg' />
             <p style = { { float: 'right' } }>Can't load this post :(</p>
         </section>
     );
 }
}
