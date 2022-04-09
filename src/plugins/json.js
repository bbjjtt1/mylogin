import JSONbig from 'json-bigint'

const instance = axios.create({
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
  
  export default instance

