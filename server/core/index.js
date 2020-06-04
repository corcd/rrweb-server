/*
 * @Author: Whzcorcd
 * @Date: 2020-06-04 15:45:11
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-04 17:31:08
 * @Description: file content
 */
const mysql = require('./server/mysql'),
  zh = require('./server/local-zh.config'),
  express = require('express'),
  path = require('path'), //系统路径模块
  bodyParser = require('body-parser'),
  request = require('request')

const utils = require('../utils')

const app = express()
const port = 8080

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'datas')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//配置跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

//查询所有表名
app.post('/rrweb/getTotalTables', (req, res) => {
  mysql.getTotalTables().then(dataBase => {
    let msg = []
    let table_name = 'table_name'
    dataBase[0]['table_name'] === undefined ? (table_name = 'TABLE_NAME') : ''
    for (let i = 0, len = dataBase.length; i < len; i++) {
      msg.push({
        en: dataBase[i][table_name],
        zh: zh[dataBase[i][table_name].toLowerCase()]
      })
    }
    res.send(msg)
  })
})

// 单表分页查询数据
app.get('/rrweb/query', (req, res, next) => {
  const { table, page, pageSize } = req.query
  mysql.query(table, page, pageSize).then(dataBase => {
    for (let i = 0, len = dataBase.list.length; i < len; i++) {
      dataBase.list[i].dataFile = dataBase.list[i].dataFile.replace(
        /.\/data\//gi,
        ''
      )
    }
    res.send(dataBase)
  })
})

// 添加数据
app.post('/rrweb/add', (req, res) => {
  const { name, isReport, data, table, msg } = req.body
  //获取ip
  const ip = utils.getClientIp(req)
  //文件名
  const date = new Date().getTime()
  const fileName = `./data/${date}.json`

  // todo
  utils.writeFile(fileName, data)

  mysql
    .add([name, ip, new Date(), fileName, msg, emotion, isReport], table)
    .then(dataBase => {
      res.send({
        msg: 'success'
      })
    })
})

app.listen(port, () => {
  console.log(`服务启动成功! 端口号：${port}`)
})
