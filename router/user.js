/**
 * 用户路由文件
 */

// 导入express
const express = require("express");
// 创建路由对象
const router = express.Router();

// 导入用户路由处理函数模块
const userHandler = require("./router_handler/user");

// 导入验证表单数据的中间件
const expressJoi = require("@escook/express-joi");
// 导入需要的验证规则对象
const { reg_log_schema } = require("../schema/user_schema");

// 挂载路由请求
router.post("/reguser", expressJoi(reg_log_schema), userHandler.regUser);
router.post("/login", userHandler.login);

// 暴露路由对象
module.exports = router;
