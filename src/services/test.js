/**
 * Created by thh on 2018/3/30.
 */
import reqPormise from '../utils/reqPromise';

export function test(data) {
  return reqPormise({
    url: '/login.do',
    data: data
  });
}