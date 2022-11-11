/**
 * 文章的处理函数文件
 */

 const db = require("../../db/db")


 //* 获取文章列表的处理函数
 exports.getArticles = (req, res)=>{
     // 定义查询文章列表的sql语句
     const sql = 'select * from article where is_delete=0 order by id asc'
     db.query(sql, (err, results)=>{
         if (err) return res.cc(err)
         res.send({
             status: 0,
             message: '文章列表获取成功！',
             data: results
         })
     })
 }
 //* 根据用户id获取文章列表的处理函数
 exports.getUserArticles = (req, res)=>{
     // 定义查询文章列表的sql语句
     const sql = 'select * from article where author_id=? order by id asc'
     db.query(sql, req.user.id,(err, results)=>{
         if (err) return res.cc(err)
         res.send({
             status: 0,
             message: '文章列表获取成功！',
             data: results
         })
     })
 }
 
 //* 设置代表作的处理函数
 exports.setWork = (req, res)=>{
     // 定义查询文章是否存在的sql语句
     const SQL = 'select * from article where id=?'
     db.query(SQL, req.body.id, (err, results)=>{
         if (err) return res.cc(err)
         // 数据条数不等于 1
         if (results.length !== 1) return res.cc('数据有误！')
         // 定义更新文章信息的sql语句
         const sql = 'update article set is_work=1 where id=? and author_id=?'
         db.query(sql, [req.body.id, req.user.id], (err, results)=>{
             if (err) return res.cc(err)
             // 影响行数不等于 1
             if (results.affectedRows !== 1) res.cc('设置失败！')
             res.cc(0, '设置成功！')
         })
     })
 }
 
 //* 获取代表作的处理函数
 exports.getWork = (req, res)=>{
     // 定义查询文章列表的sql语句
     const sql = 'select * from article where is_work=1 and author_id=?'
     db.query(sql, req.user.id, (err, results)=>{
         if (err) return res.cc(err)
         res.send({
             status: 0,
             message: '代表作获取成功！',
             data: results
         })
     })
 }
 
 //* 发布文章的处理函数
 exports.pubArticle = (req, res) => {
     // 判断该 author_id 是否存在
     const sql_user = 'select * from reg_users where id=?'
     db.query(sql_user, req.body.author_id, (err, results) => {
         if (err) return res.cc(err)
         // 执行成功 但 results.length 不等于1
         if (results.length !== 1) return res.cc('该作者账户不存在！')
         // 判断该 cate_id 是否存在
         const sql_cate = 'select * from sorts where id=?'
         db.query(sql_cate, req.body.cate_id, (err, results) => {
             if (err) return res.cc(err)
             // 执行成功 但 results.length 不等于 1
             if (results.length !== 1) return res.cc('该分类不存在！')
             // 定义插入文章到数据库的sql语句
             const sql = 'insert into article set ?'
             db.query(sql, req.body, (err, results) => {
                 if (err) return res.cc(err)
                 // 执行成功 但影响行数 不等于 1
                 if (results.affectedRows !== 1) return res.cc('文章发表失败！')
                 res.cc(0, '文章发表成功！')
             })
         })
     })
 }
 
 //* 修改文章的处理函数
 exports.changeArticle = (req, res) => {
     // 定义查询文章是否存在的sql语句
     const SQL = 'select * from article where id=?'
     db.query(SQL, req.body.id, (err, results)=>{
         if (err) return res.cc(err)
         // 数据条数不等于 1
         if (results.length !== 1) return res.cc('数据有误！')
         // 定义更新文章信息的sql语句
         const sql = 'update article set ? where id=?'
         db.query(sql, [req.body, req.body.id], (err, results)=>{
             if (err) return res.cc(err)
             // 影响行数不等于 1
             if (results.affectedRows !== 1) res.cc('修改失败！')
             res.cc(0, '修改成功！')
         })
     })
 }