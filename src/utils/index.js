

// 日期时间格式化
 const dateFormat = (date, fmtExp = 'yy-MM-dd') => {
  date = new Date(Number(date))
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmtExp)) {
    fmtExp = fmtExp.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmtExp)) {
      fmtExp = fmtExp.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmtExp
}


function fillZero (value = 0, place = 2) {
  const valueLen = value.toString().length
  const zeroLen = place - valueLen
  const arr = []
  for (let i = 0; i < zeroLen; i++) {
    arr.push('0')
  }
  const zero = arr.join('')
  if (value < Math.pow(10, place)) {
    return `${zero}${value}`
  }
  return `${value}`
}

export default{
  dateFormat,
  fillZero
}
