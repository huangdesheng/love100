import ax from '../axios'

// 获取首页信息(true)
export function indexData(params) {
  return ax.post('/home/data', params)
    .then(res => res.data)
    .catch(err => err)
}

// 教育互助个人信息上传 (index/recipientsInfo)(true)
export function recipientPersonUpload(params) {
  return ax.post('/mutual/recipients', params)
    .then(res => res.data)
    .catch(err => err)
}

// 上传受助人身份证(index/recipientsInfo) (true)
export function IDCard(params) {
  return ax.post('/mutual/recipientsImg', params)
    .then(res => res.data)
    .catch(err => err)
}

// 大学-省份
export function proviceList(params) {
  return ax.post('/mutual/province', params)
    .then(res => res.data)
    .catch(err => err)
}



// 下一步
export function paymenInformation(params) {
  return ax.post('/mutual/paymenInformation', params)
    .then(res => res.data)
    .catch(err => err)
}


export function information(params) {
  return ax.post('/mutual/information', params)
    .then(res => res.data)
    .catch(err => err)
}


// 互助成功后的信息
export function payComplete(params) {
  return ax.post('/mutual/payComplete', params)
    .then(res => res.data)
    .catch(err => err)
}
