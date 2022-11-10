/**
 * 数据验证文件
 */

// 导入joi 模块
const joi = require("joi");

/**
 * string() 表示值必须是字符串
 * alphanum() 值只能是包含a-zA-Z0-9的字符串
 * min(length)最小长度
 * max(length)最大长度
 * required() 值必须是必填项 不能为undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 * integer() 表示 值必须是整数
 */

// 定义用户名和密码的验证规则
const username = joi.string().min(1).max(10).required();
const password = joi
  .string()
  .pattern(/^[\S]{4,16}$/)
  .required();

// 定义 id email 的验证规则
const id = joi.number().integer().min(1).required()
const email = joi.string().email().required()
// 定义 头像图片格式 的验证规则
const avator = joi.string().dataUri().required()

// 定义验证注册和登录 表单数据的规则对象
exports.reg_log_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
};

// 向外共享 验证更新用户信息 的验证规则对象
exports.update_userinfo_schema = {
  body: {
    id,
    username,
    email: email,
    user_pic: avator
  }
}

// 向外共享 重置密码  的验证规则对象
exports.update_password_schema = {
  body: {
    // 使用 password 规则 验证 req.body.oldPwd 的值
    oldPwd: password,
    // 使用 joi.not(joi.ref('oldPwd').concat(password)) 规则 验证newPwd的值
    /**
     * joi.ref('oldPwd') 表示 newPwd 必须与oldPwd 的值保持一致
     * joi.not(joi.ref('oldPwd')) 表示 newPwd 不能与 oldPwd 的值一样
     * .concat() 用于合并joi.not(joi.ref('oldPwd')) 和 password这两条验证规则
     */
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}
