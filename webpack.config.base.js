/**
 * Created by thh on 2018/3/28.
 */
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

const STATIC = 'static';
const extractStyle = new extractTextWebpackPlugin(`${STATIC}/css/style.[hash].css`);

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/Index.jsx'),
    vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router'],
    libs: ['jquery', 'nprogress']
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, 'build'),
    filename: `${STATIC}/js/[name].[hash].js`
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: path.join(__dirname, 'node_modules')
      },
      {
        test: /\.(css|scss)$/,
        use: extractStyle.extract(['css-loader', 'postcss-loader', 'sass-loader'])
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
              name: `${STATIC}/images/[name].[hash].[ext]`
            }
          }
        ]
      },
      {
        test: /\.ico$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              name: `${STATIC}/images/[name].[ext]`
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.join(__dirname, 'src/fonts'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
              name: `${STATIC}/fonts/[hash].[ext]`
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractStyle,
    new HtmlWebpackPlugin({
      title: 'react16-staging',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      inject: true,
      favicon: path.resolve(__dirname, 'src/images/favicon.ico')
    }),
    new CleanWebpackPlugin(['build']),
    new Webpack.HashedModuleIdsPlugin(), // 公共模块不重复编译
    new Webpack.LoaderOptionsPlugin({
      minimize: true // 压缩loader读取的文件
    })
  ]
};