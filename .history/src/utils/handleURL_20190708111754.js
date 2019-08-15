export function urlSearch() {
  if (location.href.indexOf('&') == -1) {
    let url = decodeURIComponent(location.href).split('=')[1]
    let openId = decodeURIComponent(url).split('#')[0]
    return openId
  } else {
    let is_dev = process.env.NODE_ENV !== "production";
    location.href = is_dev ? "http://tonyleung.natapp1.cc/wechat/authorize/1" : 'http://love100.qxiao.net/wechat/authorize/1'
    let url = decodeURIComponent(location.href).split('=')[1]
    let urls = decodeURIComponent(url).split('#')[0]
    let openId = decodeURIComponent(urls).split('&')[0]
    return openId
  }
}
