/**
 * 获取用户信息路由文件
 */

 const express = require('express')

 const router = express.Router()
 // 导入路由处理函数模块
 const userInfoHandler = require('./router_handler/userinfo')
 
 // 导入验证规则模块
 const expressJoi = require('@escook/express-joi')
 // 导入需要的验证规则对象
 const { update_userinfo_schema, update_password_schema } = require('../schema/user_schema')
 
 // 获取用户信息的路由
 router.get('/userinfo', userInfoHandler.getUserInfo)
 // 更新用户信息的路由
 router.post('/userinfo', expressJoi(update_userinfo_schema), userInfoHandler.updateUserInfo)
 // 删除用户的路由
 router.post('/userinfo/delete:id', userInfoHandler.deleteUser)
 /**
  *  获取用户列表的路由
  */
 router.get('/userlist',userInfoHandler.getUserList)
 // 重置密码的路由
 router.post('/updatepwd', expressJoi(update_password_schema), userInfoHandler.updatePassword)
 
 module.exports = router