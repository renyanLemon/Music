// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化数据库
cloud.init()
const db = cloud.database()

// 引入 request-promise
const rp = require('request-promise')

const musiclistCollection = db.collection('musiclist')
const URL = 'http://musicapi.xiecheng.live/personalized'

//定义每次取得数量
const MAX_LIMIT = 10

// 云函数入口函数
exports.main = async (event, context) => {
  
  //获取云数据库总数据数量
  const countResult = await musiclistCollection.count()
  const total = countResult.total
  
  //计算需要取得数据的次数
  const batchTimes = Math.ceil(total / MAX_LIMIT)

  //定义数据放promise集合
  const tasks = []
  
  // 读取数据
  for (let i = 0; i < batchTimes; i++) {
   let promise = musiclistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
   tasks.push(promise)
  }
  let list = {
    data: []
  }
  //所有任务完成后 将数据赋给list
  if(tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }
  //获取插入数据库的数据
  const musiclist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })
  //去重
  const newData = []
  for(let i=0; i<musiclist.length; i++) {
    let flag = true
    for(let j=0; j<list.data.length; j++) {
      if(musiclist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if(flag) {
      newData.push(musiclist[i])
    }
  }
  //将数据插入数据库
  for (let i = 0; i < newData.length; i++) {
    await musiclistCollection.add({
     data: {
       ...newData[i],
       createdTime: db.serverDate()
     }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.log('插入失败')
    })
  }
  //返回插入数据的条数
  return newData.length
}