import Vue from 'vue'
import App from './App.vue'
//导入element-ui模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入路由模块
import router from '@/router';
//导入md5加密文件
import md5 from './plugins/md5'

import { Message } from 'element-ui';

import JSONbig from 'json-bigint'

//设置全局代理、解决跨域
var axios = require('axios')
axios.default.baseURL = '/api'

Vue.prototype.$axios = axios
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(md5)

const request = axios.create({
  // baseURL: 'http://api-toutiao-web.itheima.net', // 请求的基础路径
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 3 * 1000,
  // 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  transformResponse: [
    function (data) {
      // Do whatever you want to transform the data
      // console.log(data)
 
      // 后端返回的数据可能不是 JSON 格式字符串
      // 如果不是的话，那么 JSONbig.parse 调用就会报错
      // 所以我们使用 try-catch 来捕获异常，处理异常的发生
      try {
        // 如果转换成功，则直接把结果返回
        return JSONbig.parse(data)
      } catch (err) {
        console.log('转换失败', err)
        // 如果转换失败了，则进入这里
        // 我们在这里把数据原封不动的直接返回给请求使用
        return data
      }
 
      // axios 默认在内部使用 JSON.parse 来转换处理原始数据
      // return JSON.parse(data)
    }
  ]
})


//添加请求拦截器
axios.interceptors.request.use( (config) => {
  //在发送请求之前做些什么
  //判断是否存在token,如果存在将每个页面header添加token
  if (localStorage.getItem("token")) {
    config.headers.common['Token'] = localStorage.getItem("token");
  }
  return config
}, (error) => {
  router.push('/login')
  return Promise.reject(error)
})

//添加响应拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response
}, (error) => {
  // 对响应错误做点什么
  if (error.response) {
    switch (error.response.status) {
      case 401:
        router.push('/login')
        Message.error("请登录")
    }
  }
  return Promise.reject(error)
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

const instance = axios.create({
  // baseURL:'/api',
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function(data) {
    try {
 // 作用1：把json字符串转为js对象
    // 作用2：把里面的大数字做安全处理
        return JSONbig.parse(data)
      } catch (err) {
          return data
        }
    }]
})

// export default instance
export default request
