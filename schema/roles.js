// 导入定义验证规则的模块
const joi = require('joi')

// 定义 城市名 和 国家 的校验规则
const name = joi.string().required()
const menu = joi.string().required()
// 定义 城市Id 的校验规则
const id = joi.number().integer().min(1).required()

// 校验规则对象 - 添加权限角色
exports.add_roles_schema = {
  body: {
    name,
    menu
  },
}

// 校验规则对象 - 修改权限角色
exports.update_roles_schema = {
    body: {
        id,
        name,
        menu
    },
  }

  // 校验规则对象 - 查找权限角色
exports.search_roles_schema = {
    body: {
      id
    },
  }

// 校验规则对象 - 删除权限角色
exports.delete_roles_schema = {
    params: {
      id,
    },
  }