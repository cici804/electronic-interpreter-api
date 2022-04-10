// 用户购买、录制讲解器操作
// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入 操作 信息路由处理函数模块
const operate_handler = require('../router_handler/operate')

// 用户购买讲解器 的列表
router.post('/buyInterpreter',operate_handler.buyInterpreter)
// 用户录制讲解器 的列表
router.post('/recordInterpreter',operate_handler.recordInterpreter)

// 向外共享路由对象
module.exports = router