import React from 'react';

export default class FriendlyError extends React.Component {
  render() {
    return (
      <div>
        <img src="/public/img/error.png" height="128" width="128"/>
        <h1>Something went wrong :(</h1>
      </div>
    );
  }
}
