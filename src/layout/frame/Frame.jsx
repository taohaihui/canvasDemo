/**
 * Created by thh on 2018/3/29.
 */
import '../../style/base.css';
import './frame.scss';
import React, {Component} from 'react';

import $ from 'jquery';

import {Radio} from 'antd';

export default class Frame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHeader: true
    };
  }

  render() {
    return (
      <div className="frame">
        <div className="header">
          <Radio className="radio">粒子</Radio>
        </div>
        <div className="content" onMouseMove={this.handleMove.bind(this)}>
          {this.props.children}
        </div>
      </div>
    );
  }

  handleMove(e) {
    let yNum = e.pageY;

    if (yNum < 100) {
      $('.header').css({
        top: 0
      });
    } else if (yNum > 100){
      $('.header').css({
        top: -100
      });
    }
  }
}