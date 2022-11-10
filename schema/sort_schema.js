/**
 * 分类的验证规则
 */

// 导入joi模块
const joi = require('joi')

// 定义分类名称name 的验证规则
const name = joi.string().min(1).max(6).required()
// 共享分类名称的验证规则对象
exports.name_sorts_schema = {
    body: {
        name
    }
}

// 定义分类 id 的验证规则
const id = joi.number().integer().min(1).required()
// 共享分类id的验证规则对象
exports.id_sorts_schema = {
    body: {
        id
    }
}

// 共享更新分类信息 id name 的验证规则对象
exports.update_sort_schema = {
    body: {
        id,
        name
    }
}
