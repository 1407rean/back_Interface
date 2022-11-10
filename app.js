// 导入express模块
const express = require("express");
const cors = require("cors");
// 导入验证模块
const joi = require("joi");
// 导入配置文件
const config = require("./config");
// 导入解析token 的中间件
const expressJWT = require("express-jwt");

// 创建web服务器实例
const app = express();

// 配置cors跨域
app.use(cors());

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// res.cc()
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 配置解析 token 的中间件 指定 /api 接口不需要验证token
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })
);

// 导入并使用用户路由
const userRouter = require("./router/user");
app.use("/api", userRouter);
// 导入并使用用户信息路由
const userinfoRouter = require("./router/userinfo");
app.use("/my", userinfoRouter);
// 导入并使用分类路由
const sortRouter = require("./router/sort");
app.use("/my/article", sortRouter);
// 导入并使用文章路由
const articleRouter = require("./router/article");
app.use("/my/article", articleRouter);

// 全局错误中间件
app.use((err, req, res, next) => {
  // 捕获 joi 错误
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 捕获token认证失败的错误
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败");
  // 未知错误
  res.cc(err);
});

app.listen(8081, () => {
  console.log("服务器启动成功！http://127.0.0.1:8081");
});
