// 导入数据库操作模块
const db = require('../db/index')

// 获取城市数据
exports.getCityInfo = (req, res) => {
    // is_delete 为 0 表示没有被 标记为删除 的数据
    const sql = 'select * from ev_city'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 2. 执行 SQL 语句成功
        res.send({
          status: 0,
          message: '获取城市列表成功！',
          data: results,
        })
      })
}

// 增加城市
exports.addCity = (req, res) => {
    // 定义查询 城市名 是否被占用的 SQL 语句
    const sql = `select * from ev_city where cityname=?`
    // 执行查重操作
    db.query(sql, req.body.cityname, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.length === 1 && results[0].cityname === req.body.cityname) return res.cc('城市名已存在，无法添加！')
        
        // 添加城市 数据库操作
        const sql = `insert into ev_city set ?`
        db.query(sql, req.body, (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err)
          
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('新增城市失败！')
          
            // 新增城市成功
            res.cc('新增城市成功！', 0)
          })
    })
}

// 删除城市的处理函数
exports.deleteCityById = (req, res) => {
    const sql = `DELETE FROM ev_city WHERE id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除城市失败！')
      
        // 删除城市成功
        res.cc('删除城市成功！', 0)
    })
}