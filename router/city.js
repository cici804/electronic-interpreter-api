// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入 城市 信息路由处理函数模块
const city_handler = require('../router_handler/city')
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { add_city_schema, delete_city_schema  } = require('../schema/city')

// 获取 城市 的基本信息
router.get('/cityInfo', city_handler.getCityInfo)

// 根据城市id 获取 城市 的基本信息
router.get('/cityInfoById', city_handler.getCityInfoById)
// 新增 城市 的基本信息
router.post('/add', expressJoi(add_city_schema), city_handler.addCity)
// 删除 城市 的基本信息
router.delete('/deletecity/:id', expressJoi(delete_city_schema), city_handler.deleteCityById)

// 向外共享路由对象
module.exports = router