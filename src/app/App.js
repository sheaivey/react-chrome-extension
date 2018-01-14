import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Page1 from './views/Page1';
import Page2 from './views/Page2';
import FriendlyError from './views/FriendlyError';
import Layout from './views/Layout';

export default class Welcome extends React.Component {
  componentDidMount() {
    document.title = chrome.runtime.getManifest().name;
  }
  render() {
    return (
      <MemoryRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/page1" exact component={Page1} />
            <Route path="/page2" exact component={Page2} />
            <Route component={FriendlyError} />
          </Switch>
        </Layout>
      </MemoryRouter>
    );
  }
}
