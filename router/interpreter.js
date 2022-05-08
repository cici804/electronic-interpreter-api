// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入 讲解器 信息路由处理函数模块
const interpreter_handler = require('../router_handler/interpreter')
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { add_interpreter_schema, update_interpreter_schema, delete_interpreter_schema  } = require('../schema/interpreter')

// 获取 讲解器 的基本信息
router.get('/info/', interpreter_handler.getInfo)
// 根据景点ID, 获取 讲解器 的基本信息
router.post('/infoByViewId', interpreter_handler.getInfoByViewId)
// 新增 讲解器 的基本信息
router.post('/add', expressJoi(add_interpreter_schema), interpreter_handler.addInterpreter)
// 修改 讲解器 的基本信息
router.post('/update', expressJoi(update_interpreter_schema), interpreter_handler.updateInterpreterById)
// 删除 讲解器 的基本信息
router.delete('/delete/:is_delete/:id', expressJoi(delete_interpreter_schema), interpreter_handler.deleteInterpreterById)

// 向外共享路由对象
module.exports = router