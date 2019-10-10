// 云函数入口文件
const cloud = require('wx-server-sdk')

const rp = require('request-promise')

const TcbRouter = require('tcb-router')

cloud.init()

const BASE_URL = 'http://musicapi.xiecheng.live'
// 云函数入口函数
exports.main = async (event, context) => {

  const app = new TcbRouter({ event })

  //.skip 指定查询返回结果时从指定序列后的结果开始返回，常用语分页
  //.limit 指定查询结果集数量上限
  //.orderBy 排序
  app.router('musiclist', async (ctx, next) => {
    ctx.body = await cloud.database().collection('musiclist')
      .skip(event.start)
      .limit(event.count)
      .orderBy('createTime', 'desc')
      .get()
      .then((res) => {
        return res
      })
  });

  //歌单列表
  app.router('songslist', async (ctx, next) => {
    ctx.body = await rp(`${BASE_URL}/playlist/detail?id=${parseInt(event.musiclistId)}`)
    .then((res) => {
      return JSON.parse(res)
    })
  });

  //音乐控制面板
  app.router('songUrl', async(ctx, next) => {
    ctx.body = await rp(`${BASE_URL}/song/url?id=${event.songId}`)
    .then((res) => {
      return res
    })
  })

  //歌词
  app.router('lyric', async (ctx, next) => {
    ctx.body = await rp(`${BASE_URL}/lyric?id=${event.songId}`)
      .then((res) => {
        return res
      })
  })

  return app.serve()
}