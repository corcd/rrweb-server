/*
 * @Author: Whzcorcd
 * @Date: 2020-06-04 15:32:29
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-04 19:28:38
 * @Description: file content
 */
const mysql = require('mysql')
//引入mysql配置
const databaseConfig = require('../../mysql.config.js')
//加载mysql配置
const connection = mysql.createConnection(databaseConfig)

connection.connect()

module.exports = {
  /**
   * 查询条数
   * @param {表名} Table
   * @param {页码，从1开始} page
   * @param {每页条数，默认10条} pageSize
   */
  query: function(Table, page = 1, pageSize = 10) {
    const start = (page - 1) * pageSize
    const query = `SELECT * FROM ${Table} limit ${start},${pageSize}`
    //查询条数
    const countQuery = `SELECT COUNT(*) FROM ${Table}`
    return new Promise((response, reject) => {
      connection.query(countQuery, (err, totalSize) => {
        if (err) {
          reject(err.message)
        } else {
          connection.query(query, (err, list) => {
            if (err) {
              reject(err.message)
            } else {
              /**
               * list 查询的数据
               * totalSize 总条数
               */
              response({
                list,
                totalSize: totalSize[0]['COUNT(*)']
              })
            }
          })
        }
      })
    })
  },
  /**
   * 添加数据
   * @param {[项目名称, uin, 来源ip, session, 数据体, 开始时间, 结束时间, 更新时间]} params
   * @param {表名} table
   */
  add: function(params = ['', '', '', '', '', '', '', ''], table) {
    const sql = `INSERT INTO ${table}(name,uin,ip,session,data,startTime,endTime,updateTime) VALUES(?,?,?,?,?,?,?,?)`
    return new Promise((response, reject) => {
      connection.query(sql, params, (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          response(result)
        }
      })
    })
  },
  getTotalTables: function() {
    const query = `SELECT table_name FROM information_schema.tables WHERE table_schema = '${databaseConfig.database}'`
    return new Promise((response, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          response(result)
        }
      })
    })
  }
}
