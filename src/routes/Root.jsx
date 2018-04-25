/**
 * Created by thh on 2018/3/28.
 */
import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';

import Frame from '../layout/frame/Frame';
import CanvasDemo from '../components/canvasDemo/CanvasDemo';
import PointLine from '../components/pointLine/PointLine';

export default class Root extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Frame}>
          <IndexRedirect to="pointLine"/>
          <Route path="canvasDemo" component={CanvasDemo}/>
          <Route path="pointLine" component={PointLine}/>
        </Route>
      </Router>
    );
  }
}

