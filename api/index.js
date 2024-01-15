import { request } from "./request";
import path from "./path";

// 处理api请求方法
const apis = Object.keys(path).reduce((obj, key) => {
  (obj[key] = (data = {}, method = "get") => {
    return request(path[key], method, data);
  }),
    {};
  return obj;
}, {});

module.exports = {
  ...apis,
};
