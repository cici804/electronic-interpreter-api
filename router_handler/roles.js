// 导入数据库操作模块
const db = require('../db/index')

// 权限管理 ev_roles
// 获取权限角色
exports.getRolesInfo = (req, res) => {
    const sql = 'select * from ev_roles'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 2. 执行 SQL 语句成功
        res.send({
          status: 0,
          message: '获取权限角色列表成功！',
          data: results,
        })
      })
}

// menu JSON格式{ "menu":[{"id":1,"name":"介绍我们"}, {"id":2,"name":"录制讲解器"}]}
// 增加权限角色
exports.addRoles = (req, res) => {
    // 定义查询 景点信息 是否已存在的 SQL 语句
    const sql = `select * from ev_roles where id=?`
    // 执行查重操作
    db.query(sql, req.body.name, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('权限角色已存在，无法添加！')
        
        // 添加权限角色信息 数据库操作
        const sql = `insert into ev_roles set ?`
        db.query(sql, req.body, (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err)
          
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('新增权限角色信息失败！')
          
            // 新增权限角色信息成功
            res.cc('新增权限角色信息成功！', 0)
        })
    })
}

// 修改权限角色
exports.updateRoles = (req, res) => {
    const sql = `update ev_roles set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改权限角色信息失败！')
        // 修改权限角色信息成功
        return res.cc('修改权限角色信息成功！', 0)
    })
}
// 根据权限id查看信息
exports.searchRoleById = (req, res) => {
    const sql = 'select * from ev_roles where id = ?'
    db.query(sql, req.body.id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 2. 执行 SQL 语句成功
        res.send({
          status: 0,
          message: '获取权限角色列表成功！',
          data: results[0],
        })
      })
}

// 删除权限角色
exports.deleteRoleById = (req, res) => {
    const sql = `DELETE FROM ev_roles WHERE id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除权限角色失败！')
      
        // 删除权限角色成功
        res.cc('删除权限角色成功！', 0)
    })
}

// 根据用户id、权限等级获取权限菜单 ev_user_role
exports.searchRoleByUserId = (req, res) => {
    const sql = `select roleID from ev_users where id=?`
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        const sql = 'select * from ev_roles where id = ?'
        db.query(sql, results[0].roleID, (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '获取用户权限角色列表成功！',
                data: results[0],
            })
        })
    })
}


// 修改用户权限角色
exports.updateUserRole = (req, res) => {
    // roleID角色权限id  id用户id
    const sql = `update ev_users set roleID = ? where id=?`
    db.query(sql, [req.body.roleID, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户权限角色信息失败！')
        // 修改用户权限角色信息成功
        return res.cc('修改用户权限角色信息成功！', 0)
    })
}