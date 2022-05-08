// 导入 express
const express = require('express')
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入用户信息路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')
// 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema, add_user_schema  } = require('../schema/user')

// 创建路由对象
const router = express.Router()

// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)
// 获取全部用户的基本信息
router.get('/usersinfo', userinfo_handler.getUsersInfo)
// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
// 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)
// 后台增加用户
router.post('/adduser', expressJoi(add_user_schema), userinfo_handler.addUser)
// 根据 username 搜索用户信息
router.post('/userinfo/search', userinfo_handler.getUserInfoByUsername)



// 向外共享路由对象
module.exports = router