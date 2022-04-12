// 导入 express
const express = require('express')
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入权限角色路由处理函数模块
const roles_handler = require('../router_handler/roles')
// 导入需要的验证规则对象
const { add_roles_schema, update_roles_schema, search_roles_schema, delete_roles_schema } = require('../schema/roles')
const { get_user_role_schema, update_user_role_schema } = require('../schema/user')
// 创建路由对象
const router = express.Router()

// 获取 权限角色 的基本信息
router.get('/rolesinfo', roles_handler.getRolesInfo)
// 增加 权限角色 的基本信息
router.post('/addroles', expressJoi(add_roles_schema), roles_handler.addRoles)
// 根据roles表的ID获取权限菜单
router.post('/searchRoleById', expressJoi(search_roles_schema), roles_handler.searchRoleById)
// 修改 权限角色 的基本信息
router.post('/updateRoles', expressJoi(update_roles_schema), roles_handler.updateRoles)
// 删除 权限角色 的基本信息
router.delete('/deleteRole/:id', expressJoi(delete_roles_schema), roles_handler.deleteRoleById)
// 根据用户id、权限等级获取权限菜单
router.get('/getUserRole', expressJoi(get_user_role_schema), roles_handler.searchRoleByUserId)
// 根据用户id、权限等级获取权限菜单
router.post('/updateUserRole', expressJoi(update_user_role_schema), roles_handler.updateUserRole)


// 向外共享路由对象
module.exports = router