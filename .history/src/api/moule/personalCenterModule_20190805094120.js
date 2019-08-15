import ax from '../axios';

export function mydata(params) {
  return ax.post('/home/mypage', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}



//我的团体帮扶（我的发起）
export function myLaunch(params) {
  return ax.get(`/group/my-apply?pageNum=${params.pageNum}&pageSize=${params.pageSize}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 我发起的团体帮扶详情（我的发起）
export function myLaunchDetails(params) {
  return ax.get(`/group/my-apply/${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

/*  我的帮扶模块*/

// 我的团体帮扶列表（我的帮扶）
export function mygroupHelp() {
  return ax.get('/group/my-support')
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 我的帮扶认领的受助人列表（我的帮扶）
export function mygroupHelpNumber(params) {
  return ax.get(`/group/my-support/${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//我的个人帮扶列表（我的帮扶）
export function myPersonHelp() {
  return ax.get('/person/my-support')
    .then(res => res.data)
    .catch(e => console.log(e));
}
export function myPersonHelpDt(params) {
  return ax.get(`/person/recipients?recipientsId=${params.recipientsId}&helpType=${params.helpType}&planId=${params.planId}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//账单

export function bill(params) {
  return ax.get(`/helpPay/bill?recipientsId=${params.recipientsId}&helpType=${params.helpType}&planId=${params.planId}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}


/*  我的发起*/

//我的个人帮扶（我的发起）
export function myLaunchPersonal(params) {
  return ax.get(`/person/my-apply?pageNum=${params.pageNum}&pageSize=${params.pageSize}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 我发起的个人帮扶详情（我的发起）
export function myLaunchPtPer(params) {
  return ax.get(`/person/my-apply/${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 我发起的个人帮扶详情（我的发起）
export function mymutual(params) {
  return ax.post(`/mutual/mymutual`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//更新团体帮扶申请(审核不通过割团体)
export function updataApply(params) {
  return ax.put(`/group/apply`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//更新个人帮扶申请（个人审核不通过）
export function updataPersonApply(params) {
  return ax.put(`/person/apply`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//我的互助里面的继续助力星星数
export function continuation(params) {
  return ax.post(`/mutual/continuation`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 继续互助支付信息
export function continueInformation(params) {
  return ax.get(`/mutual/payInfo/repay/${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 继续支付
export function continuePay(params) {
  return ax.post(`/mutual/continue`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 申请奖励金列表
export function applicationReward() {
  return ax.get(`/Application`)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 查询受助人信息（我的奖励金）
export function ApplicationMutalQuery(params) {
  return ax.post(`/Application/ApplicationMutalQuery`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 奖励金提交申请(我的奖励金)
export function submitApply(params) {
  return ax.post(`/Application/AuditInformation`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 奖励金修改信息
export function AuditInformationUpdate(params) {
  return ax.get(`/Application/${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 奖励金修改提交按钮
export function AuditInformationSubmission(params) {
  return ax.post(`/Application/AuditInformationSubmission`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//我的公益
export function welfarRecord(params) {
  return ax.post(`/welfare/welfarRecord`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 我的爱心值
export function getloveValue(params) {
  return ax.post(`/love/loveValue`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// GET /group/my-support/{planId}


// 我的互助详情
export function myMutalDetails(params) {
  return ax.post(`/mutual/myMutalDates`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
export function mySuportInfo(params) {
  return ax.post(`/mutual/bill`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
