<!--
 * @Author: Whzcorcd
 * @Date: 2020-06-04 15:26:34
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-05 10:29:08
 * @Description: file content
-->

# rrweb-server

A web server that is used to record data

This project is in the middle of a high-speed iteration

## Technical framework

- Node 10+
- Express 4.x
- Mysql

## Api details

Accpet `Content-type: application/json`

### add

![](https://img.shields.io/badge/Method-POST-green)

**Router:** `/rrweb/add`

**Params:**

```javascript
/**
 * @param {项目名称} name
 * @param {uin} uin
 * @param {session} session
 * @param {数据} data
 * @param {开始时间戳} startTime
 * @param {结束时间戳} endTime
 */
```

### query

![](https://img.shields.io/badge/Method-GET-blue)

**Router:** `/rrweb/query`

**Params:**

```javascript
/**
 * @param {项目名} name
 * @param {uin} uin
 * @param {页码，从1开始} page
 * @param {每页条数，默认10条} pageSize
 */
```

### data

![](https://img.shields.io/badge/Method-GET-blue)

**Router:** `/rrweb/data`

**Params:**

```javascript
/**
 * @param {项目名称} name
 * @param {session} session
 */
```

### del

![](https://img.shields.io/badge/Method-DELETE-red)

**Router:** `/rrweb/del`

**Params:**

```javascript
/**
 * @param {项目名称} name
 * @param {session} session
 */
```

### others

coming soon...

## Start

```bash
sudo yarn
node server/core
```

## License

MIT
