import ax from '../axios';

//注册
export function register(params) {
  return ax.post('/love100/register', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 登录
export function login(params) {
  return ax.post('/love100/login', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 实名认证检测接口
export function checkRealName() {
  return ax.get('/account/check')
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 进行实名认证
export function RealName(params) {
  return ax.post('/account/certify', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 教育互助提交检查身份证
export function verification(params) {
  return ax.post('/mutual/verification', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 获取验证码
export function getCode(params) {
  return ax.post('/common/sms', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 切换实名认证手机号
export function switchPhone(params) {
  return ax.post('/account/tele', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 注册
export function authorize() {
  return ax.get('/wechat/authorize/1')
    .then(res => res.data)

}

// 支付(个人帮扶，团体帮扶支付)
export function WxPay(params) {
  return ax.post('/helpPay/', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 获取支付信息
export function payInfo(params) {
  console.log(params)
  return ax.get(`/helpPay/payInfo?planId=${params.planId}&type=${params.type}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 互助支付
export function helpWxpay(params) {
  return ax.post(`/mutual/mutualPay`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


//银行卡账号识别银行 
export function binName(params) {
  return ax.post('/common/bin', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function wechat(params) {
  return ax.post('/wechat/wechatImgUpload', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


export function token(params) {
  return ax.get(`/wechat/sign?${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}
