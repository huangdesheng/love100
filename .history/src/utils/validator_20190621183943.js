//手机号
export function isPhone(value) {
  let regExp = new RegExp(/^1[3|4|5|7|8][0-9]\d{8}$/); // {4,8}$/
  return !regExp.test(value) ? false : true;
}

//邮箱
export function isEmail(email) {
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

//身份证检验
export function idCard(idcard) {
  var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[x|X])$/;
  return idcard_patter.test(idcard);
}

export function realName(name) {
  let name_patter = /^[\u4e00-\u9fa5]+$/;
  return name_patter.test(name);
}

// // 
export function age(age) {
  var yearage = /^[0-9]+$/;
  return yearage.test(age);
}


// export function bankCode(code) {
//   var regex = /^(998801|998802|622525|622526|435744|435745|483536|528020|526855|622156|622155|356869|531659|622157|627066|627067|627068|627069)\d{10}$/;
//   return regex.test(code);
// }
