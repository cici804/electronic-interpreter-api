// 导入数据库操作模块
const db = require('../db/index')
// 在头部区域导入 bcryptjs 后，
// 即可使用 bcrypt.compareSync(提交的密码，数据库中的密码) 方法验证密码是否正确
// compareSync() 函数的返回值为布尔值，true 表示密码正确，false 表示密码错误
const bcrypt = require('bcryptjs')

// 获取全部用户信息
// 获取用户基本信息的处理函数
exports.getUsersInfo = (req, res) => {
    const sql = `select id, username, nickname, roleID, user_pic, coin, buy, record from ev_users`
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
    
        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取全部用户基本信息成功！',
            data: results,
        })
    })
  
}

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    // 根据用户的 id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    const sql = `select id, username, nickname, roleID, user_pic, coin, buy, record from ev_users where id=?`
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, req.user.id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
    
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取用户基本信息失败！')
    
        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results[0],
        })
    })
  
}
// 修改用户信息
exports.updateUserInfo = (req, res) => {
    // 根据用户的 id，更改用户的基本信息
    const sql = `update ev_users set nickname=?,roleID=?,coin=? where id=?`
    console.log(req.body);
    db.query(sql, [req.body.nickname, req.body.roleID, req.body.coin, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
      
        // 修改用户信息成功
        return res.cc('修改用户基本信息成功！', 0)
      })
}

// 重置密码的处理函数
exports.updatePassword = (req, res) => {
    // 定义根据 id 查询用户数据的 SQL 语句
    const sql = `select * from ev_users where id=?`

    // 执行 SQL 语句查询用户是否存在
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 检查指定 id 的用户是否存在
        if (results.length !== 1) return res.cc('用户不存在！')

        // 判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('原密码错误！')

        // 定义更新用户密码的 SQL 语句
        const sql = `update ev_users set password=? where id=?`

        // 对新密码进行 bcrypt 加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        // 执行 SQL 语句，根据 id 更新用户的密码
        db.query(sql, [newPwd, req.user.id], (err, results) => {
        // SQL 语句执行失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新密码失败！')

        // 更新密码成功
        res.cc('更新密码成功！', 0)
        })
    })
    
    
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?'
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新头像失败！')
      
        // 更新用户头像成功
        return res.cc('更新头像成功！', 0)
      })
}

// 后台增加用户
exports.addUser = (req, res) => {
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

// 根据用户名获取用户信息
exports.getUserInfoByUsername = (req, res) => {
    const sql = `select * from ev_users where username = ?`
    db.query(sql, req.body.username, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results,
        })
    })
}

// 删除用户信息的处理函数
// exports.deleteUserinfoById = (req, res) => {
//     const sql = `UPDATE ev_views set is_delete=? WHERE id=?`
//     db.query(sql, [req.params.is_delete, req.params.id], (err, results) => {
//         // 执行 SQL 语句失败
//         if (err) return res.cc(err)
      
//         // SQL 语句执行成功，但是影响行数不等于 1
//         if (results.affectedRows !== 1) return res.cc('删除用户信息失败！')
      
//         // 删除用户信息成功
//         res.cc('删除用户信息成功！', 0)
//     })
// }