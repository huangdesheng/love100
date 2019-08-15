import ax from '../axios'


// 其他公益列表（true）

export function welfareList(params) {
  return ax.post('/welfare/welfareData', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 其他公益详情（true）
export function welfarDetails(params) {
  return ax.post('/welfare/welfarDetails', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 搜索
export function searchWelfare(params) {
  return ax.post('/welfare/keyWordQuery', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 公益支付
export function welfarPay(params) {
  return ax.post('/welfare/welfarPay', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function welpayComplete(params) {
  return ax.post('/welfare/payComplete', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
