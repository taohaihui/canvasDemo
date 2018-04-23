/**
 * @desc 用于格式化各种数据, 如从后台拿到timestamp, 需要转换成年月日等...
 */

/**
 * time 毫秒数
 * formatter 期望格式  支持格式：YY-MM-DD HH:MM:SS YY-MM-DD HH:MM YY-MM-DD
 * */
export function formatterDate(time, formatter = 'YY-MM-DD HH:MM') {
  let date = new Date();
  date.setTime(time);

  let year = date.getFullYear();
  let month = addZero(date.getMonth() + 1);
  let day = addZero(date.getDate());
  let h = addZero(date.getHours());
  let m = addZero(date.getMinutes());
  let s = addZero(date.getSeconds());

  let dateStr = '';
  if(formatter === 'YY-MM-DD HH:MM:SS') {
    dateStr = `${year}-${month}-${day} ${h}:${m}:${s}`;
  }else if(formatter === 'YY-MM-DD HH:MM') {
    dateStr = `${year}-${month}-${day} ${h}:${m}`;
  }else if(formatter === 'YY-MM-DD') {
    dateStr = `${year}-${month}-${day}`;
  }

  return dateStr;
}

/* 补零 */
function addZero(num) {
  let str = '';
  if (num < 10) {
    str = '0' + num;
  }else {
    str = '' + num;
  }

  return str;
}