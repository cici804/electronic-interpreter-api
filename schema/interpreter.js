// 导入定义验证规则的模块
const joi = require('joi')

// 讲解器相关操作表单
const publisher_id = joi.number().integer().min(1).required()
const view_id = joi.number().integer().min(1).required()
const create_time = joi.string().required()
// 被购买次数
const hits = joi.number().integer().required()
const content = joi.string().required()
const vedio_url = joi.string().required()

// 删除需要传
const is_delete = joi.number().integer().required()

// 定义 讲解器Id 的校验规则
const id = joi.number().integer().min(1).required()

// 校验规则对象 - 添加讲解器
exports.add_interpreter_schema = {
  body: {
    publisher_id,
    view_id,
    create_time,
    content,
    vedio_url
  },
}

// 校验规则对象 - 修改讲解器
exports.update_interpreter_schema = {
  body: {
    id,
    content,
    vedio_url,
  },
}
// 校验规则对象 - 删除讲解器
exports.delete_interpreter_schema = {
    params: {
      id,
      is_delete,
    },
}

