import { getEnvToken } from '../utils/index'

const { apiPath, token } = getEnvToken()
export const request = (path, method, data = {}) => {
  const header = {
    'Content-Type': 'application/json',
  }

  // console.info(`#api-------请求路径-------#:${apiPath}${path}`)
  // console.info(`#api-------请求参数-------#:${JSON.stringify(data)}`)

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${apiPath}${path}`,
      method,
      header: Object.assign(header, data.headers || {}),
      data: { ...dealObjectValue(data), token },
      success(res) {
        console.info(`#api-------返回数据-------#:${res.data}`)
        return resolve(res.data)
      },
      fail(error) {
        console.info(`api请求报错:${JSON.stringify(error)}`)
        reject(error)
      },
      complete() {
        // console.log('执行了----complete', `${baseUrl}${path}`)
      },
    })
  })
}

/**
 *  判断传入参数的类型，以字符串的形式返回
 *  @obj：数据
 **/
const dataType = (obj) => {
  if (obj === null) return 'Null'
  if (obj === undefined) return 'Undefined'
  return Object.prototype.toString.call(obj).slice(8, -1)
}

/**
 * 处理对象参数值，排除对象参数值为""、null、undefined，并返回一个新对象
 **/
const dealObjectValue = (obj) => {
  let param = {}
  if (obj === null || obj === undefined || obj === '') return param
  for (var key in obj) {
    if (dataType(obj[key]) === 'Object') {
      param[key] = dealObjectValue(obj[key])
    } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      param[key] = obj[key]
    }
  }
  return param
}
