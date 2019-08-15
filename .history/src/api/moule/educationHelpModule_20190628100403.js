import ax from '../axios';

//个人信息上传
export function singleInfoUpload(params) {
  return ax.post('/person/apply', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 单张照片上传(true)
export function singleUpload(params, config) {
  return ax.post('/fdfs/upload', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 单图上传
export function singleUploadTwo(params, config) {
  return ax.post('/fdfs/upload-test', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 多图上传
export function moreUpload(params, config) {
  return ax.post('/fdfs/uploadFiles', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 团体帮扶项目列表（helpProgram/index.vue）(true)
export function groupHelp(params) {
  return ax.get(`/group/projects?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 团体帮扶详情（helpProgram/programDetails）(true)
export function groupHelpDetails(params) {
  return ax.get('/group/project/' + params + '', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 帮扶对象列表（helpProgram/programDetails）
export function helpObjectList(params) {
  return ax.get(`/group/helpful/${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}





// 个人帮扶项目列表（helpProgram/index.vue）(true)
export function personalHelpList(params) {
  return ax.get(`/person/projects?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//个人帮扶项目详情 （helpProgram/personProgramDetails）(true)
export function personalHelpDetails(params) {
  return ax.get('/person/project/' + params + '', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 确认帮扶
export function confirmPay(params) {
  return ax.post('/helpPay/confirm', params)
    .then(res => res.data)
    .catch(err => err)
}

// 提交团体帮扶信息
export function groupApply(params) {
  return ax.post('/group/apply', params)
    .then(res => res.data)
    .catch(err => err)
}

// 提交个人帮扶信息

export function personApply(params) {
  return ax.post('person/apply', params)
    .then(res => res.data)
    .catch(err => err)
}

// 我发起的帮扶项目
export function myLaunchHelp() {
  return ax.get('/group/my')
    .then(res => res.data)
    .catch(err => err)
}


// 机构列表
export function institutionalList() {
  return ax.get('/organ')
    .then(res => res.data)
    .catch(err => err)
}

// 新增机构信息
export function addInstitutional(params) {
  return ax.post('/organ', params)
    .then(res => res.data)
    .catch(err => err)
}


// 机构详情
export function institutionalDetails(params) {
  return ax.get(`/organ/${params}`)
    .then(res => res.data)
    .catch(err => err)
}

//修改机构信息
export function updataInstitutional(params) {
  return ax.put(`/organ`, params)
    .then(res => res.data)
    .catch(err => err)
}

//删除机构信息
export function deleteInstitutional(params) {
  return ax.delete(`/organ/${params}`)
    .then(res => res.data)
    .catch(err => err)
}

// 三级联动数据
export function SSXAPI() {
  return ax.get(`/common/district`)
    .then(res => res.data)
    .catch(err => err)
}


export function helpPayCompleted(params) {
  return ax.get(`/helpPay/completed?planId=${params.planId}&type=${params.type}`)
    .then(res => res.data)
    .catch(err => err)
}


// 受助人列表
export function recipientsList(params) {
  return ax.get(`/group/recipients`)
    .then(res => res.data)
    .catch(err => err)
}

export function NorecipientsList(params) {
  console.log(params)
  return ax.get(`/group/project-recipients/${params}`)
    .then(res => res.data)
    .catch(err => err)
}



// 保存受助人
export function saveRecipients(params) {
  return ax.post(`/group/recipients`, params)
    .then(res => res.data)
    .catch(err => err)
}

// 删除受助人 /group/recipients
export function delRecipients(params) {
  return ax.delete(`/group/recipients?recipientsIds=${params}`)
    .then(res => res.data)
    .catch(err => err)
}


// 获取受助人信息
export function RecipientsInfo(params) {
  return ax.get(`/group/recipients/${params}`)
    .then(res => res.data)
    .catch(err => err)
}
