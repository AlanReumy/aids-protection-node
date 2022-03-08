const model = require("../model");
const Router = require("koa-router");
let router = new Router({
  prefix: "/api/user",
});

let User = model.User; //获取User模型

//注册
router.post("/register", async (ctx) => {
  let registerUser = ctx.request.body;
  const { username, isVolunteer, password, phone } = registerUser;
  await User.create({
    username,
    password,
    isVolunteer,
    phone,
  })
    .then((result) => {
      ctx.body = new global.errs.Success({
        info: result,
        res: "注册成功",
      });
    })
    .catch((err) => {
      ctx.body = new global.errs.HttpException("注册失败");
    });
});

//登录
router.post("/login", async (ctx) => {
  let loginUser = ctx.request.body;
  //数据库查询
  await User.findOne({
    where: {
      username: loginUser.username,
    },
  })
    //查询值传入
    .then(async (result) => {
      //判断密码是否一致
      if (result && result.password === loginUser.password) {
        ctx.body = new global.errs.Success({
          info: result,
        });
      } else {
        ctx.body = new global.errs.NotFound("登录失败");
      }
    })
    .catch((err) => {
      ctx.body = new global.errs.NotFound("登录失败");
    });
});

module.exports = router;
