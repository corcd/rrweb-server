# rrweb-server

A web server that is used to record data

This project is in the middle of a high-speed iteration

Matching client-side: [https://github.com/corcd/gdy-rrweb-plugin]()

## Technical framework

- Node 10+
- Express 4.x
- Mysql

## Api details

Accpet `Content-type: application/json`

### **add**

**Method:** `POST`

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

### **query**

**Method:** `GET`

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

### **data**

**Method:** `GET`

**Router:** `/rrweb/data`

**Params:**

```javascript
/**
* @param {项目名称} name
* @param {session} session
*/
```

### **del**

**Method:** `DELETE`

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
