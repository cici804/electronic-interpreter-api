// 导入 express
const express = require('express')
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入用户信息路由处理函数模块
const views_handler = require('../router_handler/views')
// 导入需要的验证规则对象
const { add_view_schema, update_view_schema, delete_view_schema  } = require('../schema/views')

// 创建路由对象
const router = express.Router()

// 获取 景点 的基本信息
router.get('/viewInfo', views_handler.getViewInfo)
// 获取删除了的景点数据
router.get('/viewDeleted', views_handler.getViewDeleted)
// 根据城市id，获取 景点 的基本信息
router.post('/viewInfoByCityId', views_handler.getViewInfoByCityId)
// 增加 景点 
router.post('/addView', expressJoi(add_view_schema), views_handler.addView)
// 修改 景点 的基本信息
router.post('/updateView', expressJoi(update_view_schema), views_handler.updateViewById)
// 删除 景点 的基本信息
router.delete('/deleteView/:is_delete/:id', expressJoi(delete_view_schema), views_handler.deleteViewById)


// 向外共享路由对象
module.exports = router