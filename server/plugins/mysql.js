/*
 * @Author: Whzcorcd
 * @Date: 2020-06-04 15:32:29
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-05 09:42:38
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
   * 查询记录数据
   * @param {表名} Table
   * @param {项目名} name
   * @param {uin} uin
   * @param {页码，从1开始} page
   * @param {每页条数，默认10条} pageSize
   */
  query: function(Table, name = '', uin = 0, page = 1, pageSize = 10) {
    const start = (page - 1) * pageSize
    const sql = `SELECT id,name,uin,ip,session,startTime,endTime,updateTime FROM ${Table} WHERE is_use=1 AND name LIKE '${name}'`
    if (uin) sql.concat(` AND uin = ${uin}`)
    sql.concat(` limit ${start},${pageSize} ORDER BY id`)

    //查询条数
    const countQuery = `SELECT COUNT(*) FROM ${Table}`
    return new Promise((response, reject) => {
      connection.query(countQuery, (err, totalSize) => {
        if (err) {
          reject(err.message)
        } else {
          connection.query(sql, (err, list) => {
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
   * 查询具体数据
   * @param {表名} Table
   * @param {项目名称} name
   * @param {session} session
   */
  data: function(Table, name, session) {
    const sql = `SELECT data FROM ${Table} WHERE is_use = 1 AND name LIKE '${name}' AND session LIKE '${session}'`
    return new Promise((response, reject) => {
      connection.query(sql, (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          response(result)
        }
      })
    })
  },
  /**
   * 添加数据
   * @param {[项目名称, uin, 来源ip, session, 数据体, 开始时间, 结束时间, 更新时间]} params
   * @param {表名} Table
   */
  add: function(Table, params = ['', '', '', '', '', '', '', '']) {
    const sql = `INSERT INTO ${Table}(name,uin,ip,session,data,startTime,endTime,updateTime) VALUES(?,?,?,?,?,?,?,?)`
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
  /**
   * 软删除数据
   * @param {表名} Table
   * @param {项目名称} name
   * @param {session} session
   */
  del: function(Table, name, session) {
    const sql = `UPDATE ${Table} SET is_use = 0 WHERE name LIKE '${name}' AND session LIKE '${session}'`
    return new Promise((response, reject) => {
      connection.query(sql, params, (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          response(result)
        }
      })
    })
  }
}
