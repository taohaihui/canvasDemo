/**
 * Created by thh on 2018/3/28.
 */
import React from 'react';
import ReactDom from 'react-dom';
import Root from './routes/Root';

import './global/global';

ReactDom.render(
  <Root/>,
  document.getElementById('root')
);