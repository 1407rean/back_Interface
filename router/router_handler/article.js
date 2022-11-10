/**
 * 文章的处理函数文件
 */

const db = require("../../db/db")

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