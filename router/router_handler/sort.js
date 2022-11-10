/**
 * 文章分类的路由处理函数文件
 */

const db = require("../../db/db")

//* 获取文章分类列表的处理函数
exports.getSorts = (req, res) => {
    // 定义获取分类列表的sql语句
    const sql = 'select * from sorts where is_delete=0 order by id asc'
    /**
     * where is_delete=0 表示查询is_delete标记为0的数据
     * order by  表示根据...排序（排序方式）
     * asc 表示升序  desc表示降序
     */
    // 执行sql
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '分类列表获取成功！',
            data: results
        })
    })
}

//* 新增分类的处理函数
exports.addSorts = (req, res) => {
    // 定义查询数据库中分类name的sql语句
    const sqlName = 'select * from sorts where name=?'
    // 判断新增分类name是否被占用
    db.query(sqlName, req.body.name, (err, results) => {
        if (err) return res.cc(err)
        // 执行成功 但results.length 不等于 0
        if (results.length !== 0) return res.cc('该分类名称已被占用！')
        // 定义插入数据的sql语句
        const sql = 'insert into sorts set ?'
        db.query(sql, req.body, (err, results)=>{
            if (err) return res.cc(err)
            // 执行成功 但影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('新增分类失败！')
            res.cc(0, '新增分类成功！')
        })
    })

    // res.send('新增分类成功！')
}

//* 删除分类的处理函数
exports.deleteSorts = (req, res) => {
    // 定义删除对应id数据的sql语句
    const sql = 'delete from sorts where id=?'
    db.query(sql, req.body.id, (err, results)=>{
        if (err) return res.cc(err)
        // 执行成功 但影响行数 不为1
        if (results.affectedRows !== 1) return res.cc('删除失败！')
        res.cc(0, '删除成功！')
    })
}

//* 根据id 获取分类的处理函数
exports.getSort = (req, res) => {
    // 定义查询id对应数据的sql语句
    const sql = 'select * from sorts where id=?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        // 执行成功  但数据条数为 0
        if (results.length !== 1) return res.cc('获取失败！')
        res.send({
            status: 0,
            message: '获取成功！',
            data: results
        })
    })
}

//* 根据id更新分类名称的处理函数
exports.updateSort = (req, res) => {
    // 定义查询id对应数据是否存在的sql语句
    const sql_id = 'select * from sorts where id=?'
    db.query(sql_id, req.body.id, (err,results) => {
        if (err) return res.cc(err)
        // 执行成功 但数据条数为0
        if (results.length == 0) return res.cc('分类数据获取失败！')
        // 定义更新分类数据的sql语句
        const sql = 'update sorts set name=? where id=?'
        db.query(sql, [req.body.name, req.body.id], (err, results) => {
            if (err) return res.cc(err)
            // 执行成功 但影响行数不等于1
            if (results.affectedRows !== 1) return res.cc('分类信息更新失败！')
            res.cc('分类信息更新成功！')
        })
    })
    // res.send('update~~')
}