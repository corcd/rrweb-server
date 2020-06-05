/*
 * @Author: Whzcorcd
 * @Date: 2020-06-04 15:45:11
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-05 09:55:43
 * @Description: file content
 */
const mysql = require('../plugins/mysql'),
  express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  dayjs = require('dayjs')

const utils = require('../utils')

const app = express()
const port = 8080

app.use(bodyParser.json({ limit: '2mb' })) //body-parser 解析json格式数据
app.use(
  bodyParser.urlencoded({
    //此项必须在 bodyParser.json 之后,为参数编码
    extended: true
  })
)

//配置跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

//默认响应体
const sendData = {
  status: 0,
  data: {},
  msg: ''
}

// 单表分页查询数据
app.get('/rrweb/query', (req, res, next) => {
  const table = 'rrweb'
  const { name, uin, page, pageSize } = req.query
  mysql
    .query(table, name, uin, page, pageSize)
    .then(dataBase => {
      const response = Object.assign({}, sendData, {
        status: 0,
        data: dataBase,
        msg: 'success'
      })
      res.json(response)
    })
    .catch(e => {
      console.log(e)
      const response = Object.assign({}, sendData, {
        status: -1,
        msg: 'fail'
      })
      res.json(response)
    })
})

// 获取单项数据
app.get('/rrweb/data', (req, res, next) => {
  const table = 'rrweb'
  const { name, session } = req.query
  mysql
    .data(table, name, session)
    .then(dataBase => {
      const response = Object.assign({}, sendData, {
        status: 0,
        data: dataBase,
        msg: 'success'
      })
      res.json(response)
    })
    .catch(e => {
      console.log(e)
      const response = Object.assign({}, sendData, {
        status: -1,
        msg: 'fail'
      })
      res.json(response)
    })
})

// 添加数据
app.post('/rrweb/add', (req, res) => {
  const table = 'rrweb'
  const { name, uin, session, data, startTime, endTime } = req.body
  //获取ip
  const ip = utils.getClientIp(req)
  //文件名
  const updateTime = dayjs().unix()

  // todo
  // const fileName = `./data/${name}.json`
  // utils.writeFile(fileName, data)

  mysql
    .add(table, [name, uin, ip, session, data, startTime, endTime, updateTime])
    .then(dataBase => {
      const response = Object.assign({}, sendData, {
        status: 0,
        msg: 'success'
      })
      res.json(response)
    })
    .catch(e => {
      console.log(e)
      const response = Object.assign({}, sendData, {
        status: -1,
        msg: 'fail'
      })
      res.json(response)
    })
})

// 软删除数据
app.delete('/rrweb/del', (req, res, next) => {
  const table = 'rrweb'
  const { name, session } = req.query
  mysql
    .data(table, name, session)
    .then(dataBase => {
      const response = Object.assign({}, sendData, {
        status: 0,
        msg: 'success'
      })
      res.json(response)
    })
    .catch(e => {
      console.log(e)
      const response = Object.assign({}, sendData, {
        status: -1,
        msg: 'fail'
      })
      res.json(response)
    })
})

app.listen(port, () => {
  console.log(`服务启动成功! 端口号：${port}`)
})
