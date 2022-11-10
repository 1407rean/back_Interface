/**
 * 文章的验证规则模块
 */

// 导入joi模块
const joi = require('joi')

// 定义 title content cate_id author_id 的验证规则
const title = joi.string().min(1).max(12).required()
const content = joi.string().min(1).required()
const cate_id = joi.number().integer().min(1).required()
const author_id = joi.number().integer().min(1).required()

// 共享文章数据验证规则对象
exports.pub_article_schema = {
    body: {
        title,
        content,
        cate_id,
        author_id
    }
}