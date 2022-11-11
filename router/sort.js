/**
 * 文章分类的路由文件
 */

// 导入express
const express = require('express')
// 创建路由对象 
const router = express.Router()

// 导入处理函数
const sortsHandler = require('./router_handler/sort')

// 导入验证规则模块
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { name_sorts_schema, id_sorts_schema, update_sort_schema } = require('../schema/sort_schema')

// 挂载路由
router.get('/cates', sortsHandler.getSorts)
router.post('/addcates', expressJoi(name_sorts_schema), sortsHandler.addSorts)
router.get('/deletecates/:id', expressJoi(id_sorts_schema) ,sortsHandler.deleteSorts)
router.get('/cates/:id', expressJoi(id_sorts_schema), sortsHandler.getSort)
router.get('/usercates', sortsHandler.getUserSorts)
router.post('/updatecates', expressJoi(update_sort_schema), sortsHandler.updateSort)

// 向外共享路由
module.exports = router
