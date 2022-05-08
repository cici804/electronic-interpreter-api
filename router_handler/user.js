const db = require('../db/index')
const bcrypt = require('bcryptjs')
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config')

// 注册新用户的处理函数
exports.regUser = (req, res) => {
    // 接收表单数据
    const userinfo = req.body;
    // 判断数据是否合法
    if (!userinfo.username || !userinfo.password) return res.cc('用户名或密码不能为空！')
    // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 定义 SQL 语句，查询用户名是否被占用
    const sqlStr = `select * from ev_users where username=?`
    db.query(sqlStr, userinfo.username, (err, results) => {
        // 执行 SQL 语句失败
        //   return res.send({ status: 1, message: err.message })
        if (err) return res.cc(err)

        // 用户名被占用
        if (results.length > 0) return res.cc('用户名被占用，请更换其他用户名！')
            
        // TODO: 用户名可用，继续后续流程...
        const sql = `insert into ev_users set ?`
        // 生成用户id
        db.query(sql, { ...userinfo }, (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
            
            // 注册成功
            // res.send({ status: 0, message: '注册成功！' })
            res.cc('注册成功！', 0)
          })
          
    })

      
}

// 登录的处理函数
exports.login = (req, res) => {
    // 定义表单数据
    const userinfo = req.body
    // 定义sql语句
    const sql = `select * from ev_users where username=?`
    // 执行sql语句，根据用户名查询用户的信息
    db.query(sql, userinfo.username, (err, results) => {
        if(err) return res.cc(err)
        // 没有查到username, results.length!=1
        if (results.length !== 1) return res.cc('用户不存在，请注册！')
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) return res.cc('登录失败！输入密码错误')

        // TODO：登录成功，生成 Token 字符串
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname 这三个属性的值
        const user = { ...results[0], password: '', user_pic: '' }
        // 对用户的信息进行加密， 生成token字符串
        // 生成 Token 字符串 jwtSecretKey是config中配置的秘钥
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn, // token 有效期为 10 个小时
        })
        res.cc({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr
        })
    })
}