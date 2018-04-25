/**
 * Created by thh on 2018/4/24.
 */
import React, {Component} from 'react';

export default class PointLine extends Component {
  constructor(props) {
    super(props);

    this.id = null; //canvas随机id
    this.canvas = null; //canvas DOM对象
    this.ctx = null; //canvas绘图对象
    this.colorArr = ['#fff', '#00FF33', '#00FFCC', '#00FFFF', '#330066', '#663399', '#993366', '#999933', '#9999CC', '#99CC99', '#CC0099', '#CC33CC', '#CC6633', '#CCCCCC', '#FF99FF', '#FFFFCC'];
    this.pointArr = [];
    this.pointNum = 1000; //初始点的个数
    this.pointMaxR = 2;
    this.pointMinR = 0.5;
    this.lineLen = 70; //两个点的距离小于该值就连线

    this.pageX = 0;
    this.pageY = 0;
    this.pageVX = 0;
    this.pageVY = 0;
  }

  render() {
    if (!this.id) {
      this.id = `canvas-${Math.random()}`;
    }

    return (
      <canvas id={this.id} style={{width: '100%', height: '100%'}}/>
    );
  }

  componentDidMount() {
    this.initCanvas();
    this.initPoint();

    this.play();

    window.onresize = () => {
      this.initCanvas();
      this.initPoint();
    };
  }

  /* 初始化画布 */
  initCanvas() {
    let canvas = document.getElementById(this.id);
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;

    canvas.width = w;
    canvas.height = h;

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.pageX = w / 2;
    this.pageY = h / 2;

    /* 初始化中心点的移动速度 */
    this.pageVX = (Math.random() - 0.5) * 5;
    this.pageVY = (Math.random() - 0.5) * 5;

    /* 根据画布宽带初始化点的个数 */
    this.pointNum = Math.ceil(w * h * 0.0005);

    this.canvas.onmousemove = (e) => {
      this.pageX = e.pageX;
      this.pageY = e.pageY;
    };
  }

  /* 初始化点的位置 */
  initPoint() {
    this.pointArr = [];
    let width = this.canvas.width;
    let height = this.canvas.height;

    for (let i = 0; i < this.pointNum; i++) {
      let pointData = {
        x: Math.ceil(width * Math.random()),
        y: Math.ceil(height * Math.random()),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        r: Math.ceil((this.pointMaxR - this.pointMinR) * Math.random() + this.pointMinR),
        c: this.colorArr[i % (this.colorArr.length - 1)]
      };

      this.pointArr.push(pointData);
    }
  }

  /* 画点 */
  drawPoint() {
    let ctx = this.ctx;

    for (let i = 0; i < this.pointArr.length; i++) {
      let point = this.pointArr[i];

      ctx.beginPath();
      ctx.fillStyle = point.c;
      ctx.arc(point.x, point.y, point.r, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  /* 画线 */
  drawLine() {
    let ctx = this.ctx;

    for (let i = 0; i < this.pointArr.length; i++) {
      let point1 = this.pointArr[i];

      for (let j = i; j < this.pointArr.length; j++) {
        let point2 = this.pointArr[j];

        let x = point1.x - point2.x;
        let y = point1.y - point2.y;
        let len = Math.sqrt(x * x + y * y);

        if (len < this.lineLen) {
          ctx.beginPath();
          ctx.strokeStyle = point1.c;
          ctx.lineWidth = 0.3;
          ctx.moveTo(point1.x, point1.y);
          ctx.lineTo(point2.x, point2.y);
          ctx.stroke();
        }

        let x1 = point1.x - this.pageX;
        let y1 = point1.y - this.pageY;
        let len1 = Math.sqrt(x1 * x1 + y1 * y1);

        let x2 = point2.x - this.pageX;
        let y2 = point2.y - this.pageY;
        let len2 = Math.sqrt(x2 * x2 + y2 * y2);

        if (len1 < this.lineLen * 2 && len2 < this.lineLen * 2) {
          ctx.beginPath();
          ctx.strokeStyle = point2.c;
          ctx.lineWidth = 0.3;
          ctx.moveTo(point1.x, point1.y);
          ctx.lineTo(point2.x, point2.y);
          ctx.stroke();
        }
      }
    }
  }

  /* 改变点的位置 */
  movePoint() {
    for (let i = 0; i < this.pointArr.length; i++) {
      let point = this.pointArr[i];

      if (point.x < 0 || point.x > this.canvas.width) {
        point.vx = -point.vx;
      }

      if (point.y < 0 || point.y > this.canvas.height) {
        point.vy = -point.vy;
      }

      point.x += point.vx;
      point.y += point.vy;
      point.r = Math.ceil((this.pointMaxR - this.pointMinR) * Math.random() + this.pointMinR);
      // point.c = this.colorArr[Math.ceil(Math.random() * this.pointArr.length) % this.pointArr.length];
    }
  }

  /* 移动中心点 */
  moveCenterPoint() {
    if(this.pageX < 0 || this.pageX > this.canvas.width) {
      this.pageVX = -this.pageVX;
    }

    if(this.pageY < 0 || this.pageY > this.canvas.height) {
      this.pageVY = -this.pageVY;
    }

    this.pageX += this.pageVX;
    this.pageY += this.pageVY;
  }

  play() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawPoint();
    this.drawLine();

    this.movePoint();
    this.moveCenterPoint();

    requestAnimationFrame(this.play.bind(this));
  }
}