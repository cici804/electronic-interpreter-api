// 导入数据库操作模块
const db = require('../db/index')


// 购买讲解器 讲解器id 创建时间 用户id
exports.buyInterpreter = (req, res) => {
// 传buy的JSON格式
// { "res":[{"interpreter_id":2,"create_time":"2022-04-10"}]}
    const sql = `update ev_users set buy = ? where id=?`
    const interpreter_id = req.body.interpreter_id
    db.query(sql, [req.body.buy, req.user.id,], (err, results) => {
        // SQL 语句执行失败
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('购买讲解器失败！')
        const sql = `update ev_interpreter set hits = hits + 1 where id=?`
        db.query(sql, interpreter_id, (err, results) => {
            // SQL 语句执行成功，但是影响行数不等于 1
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('购买讲解器失败！')
            
            // 购买讲解器成功
            res.cc('购买讲解器成功！', 0)
        })
        
    })
}

// 用户录制讲解器
exports.recordInterpreter = (req, res) => {
    // 传record的JSON格式
    // { "res":[{"interpreter_id":2,"create_time":"2022-04-10"}]}
    const sql = `update ev_users set record = ? where id=?`
    db.query(sql, [req.body.record, req.user.id,], (err, results) => {
        // SQL 语句执行失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('录制讲解器失败！')

        // 录制讲解器成功
        res.cc('录制讲解器成功！', 0)
    })
}
