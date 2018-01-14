import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

export default class Page1 extends React.Component {
  render() {
    return (
      <div>
        <img src="/public/img/icon.png" height="128" width="128"/>
        <h1>Page 1</h1>
      </div>
    );
  }
}
