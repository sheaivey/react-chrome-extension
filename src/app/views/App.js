import React from 'react';

export default class Welcome extends React.Component {
  componentDidMount() {
    document.title = chrome.runtime.getManifest().name;
  }
  render() {
    return (
      <div>
        <img src="/public/img/icon.png" height="128" width="128"/>
        <h1>{chrome.runtime.getManifest().name}</h1>
      </div>
    );
  }
}
