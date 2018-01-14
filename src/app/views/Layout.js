import React from 'react';
import NavBar from '../components/NavBar';

export default class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <NavBar />
      </React.Fragment>
    );
  }
}
