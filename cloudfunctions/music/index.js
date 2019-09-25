// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //.skip 指定查询返回结果时从指定序列后的结果开始返回，常用语分页
  //.limit 指定查询结果集数量上限
  //.orderBy 排序
  return await cloud.database().collection('musiclist')
  .skip(event.start)
  .limit(event.count)
  .orderBy('createTime', 'desc')
  .get()
  .then((res) => {
    return res
  })
}