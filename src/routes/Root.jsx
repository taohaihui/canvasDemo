/**
 * Created by thh on 2018/3/28.
 */
import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';

import Frame from '../layout/frame/Frame';
import CanvasDemo from '../components/canvasDemo/CanvasDemo';

export default class Root extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Frame}>
          <IndexRedirect to="canvasDemo"/>
          <Route path="/canvasDemo" component={CanvasDemo}/>
        </Route>
      </Router>
    );
  }
}

