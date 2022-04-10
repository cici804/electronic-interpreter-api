// 导入数据库操作模块
const db = require('../db/index')

// 根据 城市id 获取景点数据
exports.getViewInfo = (req, res) => {
    // 根据城市的 id，查询城市的所有景点数据
    const sql = `select * from ev_views where cityid=?`
    db.query(sql, req.body.cityid, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
    
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取景点信息失败！')
    
        // 3. 将景点信息响应给客户端
        res.send({
            status: 0,
            message: '获取景点信息成功！',
            data: results[0],
        })
    })
}

// 增加景点
exports.addView = (req, res) => {
    // 定义查询 景点信息 是否已存在的 SQL 语句
    const sql = `select * from ev_views where view_name=?`
    // 执行查重操作
    db.query(sql, req.body.view_name, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.length === 1 && results[0].view_name === req.body.view_name) return res.cc('景点信息已存在，无法添加！')
        
        // 添加景点信息 数据库操作
        const sql = `insert into ev_views set ?`
        db.query(sql, req.body, (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err)
          
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('新增景点信息失败！')
          
            // 新增景点信息成功
            res.cc('新增景点信息成功！', 0)
          })
    })
}

// 修改景点信息
exports.updateViewById = (req, res) => {
    // 根据景点的 id，更改景点的基本信息
    const sql = `update ev_views set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改景点信息失败！')
        console.log(req.body)
        // 修改景点信息成功
        return res.cc('修改景点信息成功！', 0)
      })
}

// 删除景点的处理函数
exports.deleteViewById = (req, res) => {
    const sql = `UPDATE ev_views set is_delete=? WHERE id=?`
    db.query(sql, [req.params.is_delete, req.params.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除景点失败！')
      
        // 删除景点成功
        res.cc('删除景点成功！', 0)
    })
}