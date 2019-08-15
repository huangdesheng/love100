import ax from '../axios';

//透明监督列表
export function transparent(params) {
  return ax.post('/transparent/supervise', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 公示详情
export function publicDetails(params) {
  return ax.post('/publicity/in', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 调查报告
export function report(params) {
  return ax.post('/publicity/Investigation', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
