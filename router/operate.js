// 用户购买、录制讲解器操作
// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入 操作 信息路由处理函数模块
const operate_handler = require('../router_handler/operate')
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { buy_interpreter_schema } = require('../schema/interpreter')


// 用户购买讲解器 的列表
router.post('/buyInterpreter', expressJoi(buy_interpreter_schema), operate_handler.buyInterpreter)
// 用户录制讲解器 的列表
router.post('/recordInterpreter',operate_handler.recordInterpreter)

// 向外共享路由对象
module.exports = router