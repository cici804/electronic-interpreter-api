// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createConnection({
  host: '127.0.0.1',
  // user: '数据库用户名',
  // password: '数据库登录密码',
  // database: '数据库名',
  user: 'root',
  password: '123456',
  database: 'electronic_interpreter_db',
})

// 向外共享 db 数据库连接对象
module.exports = db