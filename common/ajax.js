import config from './../config'
/*eslint-disable */

export function toQueryPair(key, value) {
  return encodeURIComponent(String(key)) + '=' + encodeURIComponent(String(value));
}
/**
 * 参数对象进行URL字符串转换
 * @param {Object} obj url data 对象
 * @returns {string} 转换后的字符串
 */
export function toQueryString(obj) {
  var result = [];
  for (var key in obj) {
    result.push(toQueryPair(key, obj[key]));
  }
  return result.join('&');
}
/**
 *
 *
 * @param option
 * @returns {XMLHttpRequest|*}
 */
export function ajax(option) {
  //debugger
  var httpRequest,
    httpSuccess,
    timeout,
    isTimeout = false,
    isComplete = false,
    url;

  url = config.apiPath + option.url;

  //time 后期封装 解决非正常频繁请求问题 优化网络
  option = {
    url: url,
    method: (option.type || "GET").toUpperCase(),
    data: option.data || null,
    arguments: option.arguments || null,
    success: option.success || function () {},
    error: option.error || function () {},
    complete: option.complete || function () {},
    isAsync: option.isAsync || true,
    timeout: option.timeout || 500000000,
    contentType: option.contentType,
    dataType: option.dataType || "json"
  };


  // url += "?time=" + (new Date()).valueOf();

  if ((option.method == "GET" || option.method == "DELETE") && option.data && typeof option.data === "object") {
    option.data = toQueryString(option.data);
  }

  //检查ajax请求
  httpSuccess = function (r) {
    try {
      return (!r.status && location.protocol === "file:") || (r.status >= 200 && r.status < 300) || (r.status === 304) || (navigator.userAgent.indexOf("Safari") > -1 && typeof r.status === "undefined");
    } catch (e) {

    }
    return false;
  };
  timeout = option.timeout;

  httpRequest = new window.XMLHttpRequest();

  /**
   * @ignore
   */
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      isComplete = true;
      if (!isTimeout) {
        var o = {};
        o.responseText = httpRequest.responseText;
        o.responseXML = httpRequest.responseXML;
        o.data = option.data;
        o.status = httpRequest.status;
        o.uri = option.url;
        o.arguments = option.arguments;
        if (option.dataType === 'json') {
          try {
            o.responseJSON = JSON.parse(httpRequest.responseText);
          } catch (e) {}
        }
        if (httpSuccess(httpRequest)) {
          var data = o.responseJSON;
          option.success(data);
        } else {
          option.error(o);
        }
        option.complete(o);
      }
      //删除对象,防止内存溢出
      httpRequest = null;
    }
  };

  if (option.method === "GET") {
    if (option.data) {
      option.url += (option.url.indexOf("?") > -1 ? "&" : "?") + option.data;
      option.data = null;
    }
  }

  if (option.method === "GET") {
    httpRequest.open("GET", option.url, option.isAsync);
    httpRequest.setRequestHeader("Content-Type", option.contentType || "text/plain;charset=UTF-8");
    httpRequest.send();
  } else if (option.method === "POST" || option.method === "PATCH") {
    httpRequest.open(option.method, option.url, option.isAsync);
    httpRequest.setRequestHeader("Content-Type", option.contentType || "application/json;charset=utf-8");
    httpRequest.send(JSON.stringify(option.data));
  } else {
    httpRequest.open(option.method, option.url, option.isAsync);
    httpRequest.send();
  }
  return httpRequest;
}
/*eslint-enable */