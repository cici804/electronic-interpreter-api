// 导入定义验证规则的模块
const joi = require('joi')

// 定义 城市名 和 国家 的校验规则
const cityname = joi.string().required()
const country = joi.string().required()
// 定义 城市Id 的校验规则
const id = joi.number().integer().min(1).required()

// 校验规则对象 - 添加城市
exports.add_city_schema = {
  body: {
    cityname,
    country
  },
}

// 校验规则对象 - 删除城市
exports.delete_city_schema = {
    params: {
      id,
    },
  }