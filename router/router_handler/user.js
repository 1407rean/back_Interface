/**
 * 这里定义的是用户注册登录的路由处理函数 供/router/user.js使用
 */

// 引入数据库模块
const db = require("../../db/db");
// 导入bcryptjs
const bcrypt = require("bcryptjs");
// 导入jsonwebtoken
const jwt = require("jsonwebtoken");
const config = require("../../config");

//* 注册用户的处理函数
exports.regUser = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userinfo = req.body;

  // 定义SQL语句查询用户名是否被占用
  const sql = "select * from reg_users where username=?";

  db.query(sql, userinfo.username, (err, results) => {
    // 执行SQL语句失败
    if (err) return res.cc(err);

    // 判断用户名是否被占用
    if (results.length > 0) {
      return res.cc("用户名已被占用，请更换其他用户名！");
    }

    // 调用 bcrypt.hashSync() 对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);

    // 定义插入新用户的SQL语句
    const sqlStr = "insert into reg_users set ?";
    const data = { username: userinfo.username, password: userinfo.password };
    db.query(sqlStr, data, (err, results) => {
      if (err) return res.cc(err);
      // SQL语句执行成功， 但影响行数不为1
      if (results.affectedRows !== 1) {
        return res.cc("注册失败，请稍后再试！");
      }
      return res.cc(0, "注册成功！");
    });
  });
};

//* 登录的处理函数
exports.login = (req, res) => {
  // 获取表单数据
  const userInfo = req.body;

  // 定义查询用户数据的SQL语句
  const sql = "select * from reg_users where username=?";
  db.query(sql, userInfo.username, (err, results) => {
    // 执行SQL失败
    if (err) return res.cc(err);
    // 执行SQL语句成功  但查询到的数据条数不等于 1
    if (results.length !== 1) return res.cc("登录失败！");
    // 判断用户输入的密码是否正确
    const compareResult = bcrypt.compareSync(
      userInfo.password,
      results[0].password
    );
    if (compareResult == false) return res.cc("密码输入错误！");

    // 生成 token
    const user = { ...results[0], password: "", user_pic: "" };
    // 对用户的信息加密 生成token
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });
    // 调用res.send将token响应给客户端
    res.send({
      status: 0,
      message: '登录成功',
      token: 'Bearer ' + tokenStr
    })
  });
};
