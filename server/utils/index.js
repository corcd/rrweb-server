/*
 * @Author: Whzcorcd
 * @Date: 2020-06-04 15:47:56
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-04 17:18:33
 * @Description: file content
 */
const fs = require('fs')

module.exports = {
  /**
   * 获取客户端ip
   * @param {request} req
   */
  getClientIp: function(req) {
    return (
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
    )
  },
  /**
   * 写文件
   * @param {文件路径以及文件名} fileName
   * @param {保存的数据} data
   */
  writeFile: function(fileName, rData) {
    fs.writeFile(fileName, rData, () => {
      console.log(`${fileName} 写入成功`)
    })
  }
}
