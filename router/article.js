/**
 * 文章的路由文件
 */

// 导入express
const express = require('express')

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 实例对象  通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads')})

// 创建路由对象
const router = express.Router()

// 导入处理函数模块
const articleHandler = require('./router_handler/article')
// 导入验证规则模块
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { pub_article_schema } = require('../schema/article_schema')

// 挂载路由
/**
 *  upload.single() 是一个局部生效的中间件 用来解析 formdata 格式的表单数据
 *  将文件类型的数据  解析并挂载到 req.file 上
 *  将文本类型的数据  解析并挂载到 req.body 上
 */
router.post('/publish', upload.single('cover_img') , expressJoi(pub_article_schema) , articleHandler.pubArticle)


// 共享路由对象
module.exports = router