/**
 * Created by thh on 2018/1/31.
 */
import $ from 'jquery';
import {message} from 'antd';
import NProgress from 'nprogress';
import {isEmpty, isString, isObject} from '../utils/util.js';

export default function reqPromise({
  url = '',
  data = null,
  cache = false, // 是否缓存请求，统一不缓存
  type = 'GET',
  dataType = 'json',
  contentType = 'application/x-www-form-urlencoded; charset=UTF-8', // 发送的数据内容编码类型
  headers = {},
  timeout = 20000,
  isSingle = false  //同一时间只能请求一次
  }) {
  if (isEmpty(url)) {
    reject('请求路径不能为空');
    return;
  }

  if (__DEV__) {
    url = `/dev${url}`;
  }

  let key = '';
  if (isSingle) {
    if(window.ajaxList[url]) {
      return;
    }
    key = url; //请求列表的键名
  } else {
    key = url + new Date().getTime(); //请求列表的键名
  }

  let oPromise = new Promise(function (resolve, reject) {
    NProgress.start(); // 加载进度条

    let oAjax = $.ajax({
      url: url,
      data: data,
      cache: cache,
      contentType: contentType,
      type: type,
      dataType: dataType,
      headers: headers,
      timeout: timeout,
      beforeSend: function (XMLHttpRequest) {},
      success: function (res, textStatus) {
        resolve(res);
      },
      error: function (error) {
        reject(error);
      },
      complete: function (XMLHttpRequest, textStatus) {
        delete window.ajaxList[key];

        if (isEmpty(window.ajaxList)) {
          NProgress.done();
          NProgress.remove();
        }
      }
    });

    window.ajaxList[key] = oAjax;
  });

  oPromise.catch(function (error) {
    isString(error) && message.error(error);
    isObject(error) && message.error('请求失败');
  });

  return oPromise;
}