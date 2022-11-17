/**
 * 这里定义的是获取用户信息的路由处理函数
 */

 const db = require("../../db/db");
 const bcrypt = require("bcryptjs");
 
 //* 获取用户信息的处理函数
 exports.getUserInfo = (req, res) => {
   const sql = "select id,username,email,user_pic from reg_users where id=?";
   db.query(sql, req.user.id, (err, results) => {
     if (err) return res.cc(err);
     if (results.length !== 1) return res.cc("获取用户信息失败！");
     res.send({
       status: 0,
       message: "获取用户信息成功！",
       data: results[0],
     });
   });
 };
 
 //* 更新用户信息的处理函数
 exports.updateUserInfo = (req, res) => {
   // 定义更新表中 id为？的数据的sql语句
   const sql = "update reg_users set ? where id=?";
   db.query(sql, [req.body, req.body.id], (err, results) => {
     if (err) return res.cc(err);
     // sql语句执行成功  但影响行数不为 1
     if (results.affectedRows !== 1) return res.cc("修改失败！");
     return res.cc(0, "修改成功！");
   });
 };
 
 //* 删除用户的处理函数
 exports.deleteUser = (req, res) => {
   // 定义删除id对应用户的sql语句
   const sql = 'delete from reg_users where id=?';
   db.query(sql, req.body.id, (err, results) => {
     if (err) return res.cc(err);
     // 影响行数不为1
     if (results.affectedRows !== 1) return res.cc("删除失败！");
     res.cc(0, "删除成功！");
   });
 };
 //* 获取用户列表的处理函数
 exports.getUserList = (req, res) =>{
   const sql = 'select id,username,email,user_pic from reg_users where is_delete=0 order by id asc'
   db.query(sql,(err, results)=>{
     if (err) return res.cc(err)
     res.send({
       code: 200,
       message: '用户列表获取成功！',
       data: results
     })
   })
 }
 
 //* 重置密码的处理函数
 exports.updatePassword = (req, res) => {
   // 根据id 判断该用户是否存在
   const SQL = "select * from reg_users where id=?";
   db.query(SQL, req.user.id, (err, results) => {
     if (err) return res.cc(err);
     // 执行成功 查询到的数据条数不为 1
     if (results.length !== 1) return res.cc("用户不存在！");
     // 用户存在 判断旧密码是否正确
     const compareResult = bcrypt.compareSync(
       req.body.oldPwd,
       results[0].password
     );
     if (!compareResult) return res.cc("旧密码输入错误！");
     // 将新密码进行 bcrypt 加密 存入数据库
     const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
     // 定义更新密码的sql语句
     const sql = "update reg_users set password=? where id=?";
     db.query(sql, [newPwd, req.user.id], (err, results) => {
       if (err) return res.cc(err);
       // 执行成功 但影响行数不等于 1
       if (results.affectedRows !== 1) return res.cc("重置密码失败！");
       res.cc(0, "重置密码成功！");
     });
   });
 };
 