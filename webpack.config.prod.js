/**
 * Created by thh on 2018/3/28.
 */
const path = require('path');
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = webpackMerge(baseConfig, {
  module: {
    rules: [
      {
        /**
         * eslint代码规范校验
         */
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: '.eslintrc.prod.json'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({               // 配置全局变量
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false
    }),
    new Webpack.optimize.UglifyJsPlugin({    // 压缩混淆js文件
      sourceMap: true,
      comments: false
    })
  ],
  devtool: 'source-map'
});