// 导入定义验证规则的模块
const joi = require('joi')

const view_name = joi.string().required()
const location = joi.string().required()
const opentime = joi.string().required()
const cityid = joi.number().integer().min(1).required()
const detail = joi.string().required()
// 删除需要传
const is_delete = joi.number().integer().required()

// 定义 景点Id 的校验规则
const id = joi.number().integer().min(1).required()

// 校验规则对象 - 添加景点
// view_name，cityid为必传
exports.add_view_schema = {
  body: {
    view_name,
    location,
    opentime,
    cityid,
    detail
  },
}

// 校验规则对象 - 修改景点
exports.update_view_schema = {
  body: {
    id,
    view_name,
    location,
    opentime,
    cityid,
    detail
  },
}
// 校验规则对象 - 删除景点
exports.delete_view_schema = {
    params: {
      id,
      is_delete,
    },
  }