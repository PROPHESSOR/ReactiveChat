import React, { Component } from 'react';
// import type from 'prop-types';

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
         <div>
             <h1>An error was occrupted! Kick your React developer down :(</h1>
         </div>
     );
 }
}
