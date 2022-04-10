// 导入数据库操作模块
const db = require('../db/index')

// 根据 景点id 获取讲解器数据
exports.getInfoByViewId = (req, res) => {
    const sql = `select * from ev_interpreter where view_id=?`
    db.query(sql, req.body.view_id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('该景点无讲解器信息！')

        // 3. 将讲解器信息响应给客户端
        res.send({
            status: 0,
            message: '获取讲解器信息成功！',
            data: results[0],
        })
    })
}

// 增加讲解器
exports.addInterpreter = (req, res) => {
    const sql = `insert into ev_interpreter set ?`
    db.query(sql, req.body, (err, results) => {
        // SQL 语句执行失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('新增讲解器信息失败！')

        // 新增讲解器信息成功
        res.cc('新增讲解器信息成功！', 0)
    })

}

// 修改 讲解器 信息
exports.updateInterpreterById = (req, res) => {
    const sql = `update ev_interpreter set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改讲解器信息失败！')
        console.log(req.body)
        // 修改讲解器信息成功
        return res.cc('修改讲解器信息成功！', 0)
      })
}

// 删除讲解器的处理函数
exports.deleteInterpreterById = (req, res) => {
    const sql = `UPDATE ev_interpreter set is_delete=? WHERE id=?`
    db.query(sql, [req.params.is_delete, req.params.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除讲解器失败！')

        // 删除讲解器成功
        res.cc('删除讲解器成功！', 0)
    })
}