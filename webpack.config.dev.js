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
              configFile: '.eslintrc.json'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 出错不输出插件
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.DefinePlugin({               // 配置全局变量
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    hot: true,
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/dev': {
        target: 'http://10.28.200.215:8090/', // 测试环境
        changeOrigin: true,
        secure: false,
        pathRewrite: {'^/dev': ''}
      }
    }
  }
});