/**
 * Created by thh on 2018/4/23.
 */
import React, {Component} from 'react';

export default class CanvasDemo extends Component {
  render() {
    if (!this.id) {
      this.id = `canvas${Math.random()}`;
    }

    return (
      <canvas id={this.id} style={{width: '100%', height: '100%', background: '#000'}}/>
    );
  }

  componentDidMount() {
    let canvas = document.getElementById(this.id);
    let ctx = canvas.getContext('2d');

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 100, 100);
  }
}