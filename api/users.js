const db = require("../model");
const Router = require("koa-router");
const upload = require("../util/upload");
const config = require("../config");
let router = new Router({
  prefix: "/api/user",
});

let { users } = db;

//注册
router.post("/register", async (ctx) => {
  let registerUser = ctx.request.body;
  const { username, isVolunteer, password, phone } = registerUser;
  await users
    .create({
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
  await users
    .findOne({
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

// 成为志愿者
router.post("/bevolunteer", async (ctx) => {
  let { userId } = ctx.request.body;
  await users
    .update(
      {
        isVolunteer: false,
      },
      {
        where: {
          id: userId,
        },
      }
    )
    .then(() => {
      ctx.body = new global.errs.Success("操作成功");
    })
    .catch(() => {
      ctx.body = new global.errs.HttpException("操作失败");
    });
});

// 上传用户头像
router.post("/upload", upload.single("file"), async (ctx) => {
  const avatar = (config.HOST + ctx.req.file.path).replace(/\\/g, "/");
  ctx.body = new global.errs.Success({
    info: avatar,
    res: "操作成功",
  });
});

// 修改用户信息
router.post("/update", async (ctx) => {
  let payload = ctx.request.body;
  let { userId, username, password, phone } = payload;
  await users
    .update(
      {
        username,
        password,
        phone,
      },
      {
        where: {
          id: userId,
        },
      }
    )
    .then((res) => {
      ctx.body = new global.errs.Success("更新成功");
    })
    .catch(() => {
      ctx.body = new global.errs.HttpException("操作失败");
    });
});

// 获取用户信息
router.post("/info", async (ctx) => {
  let { userId } = ctx.request.body;
  await users
    .findOne({
      where: {
        id: userId,
      },
    })
    .then((res) => {
      ctx.body = new global.errs.Success({
        info: res,
        res: "操作成功",
      });
    })
    .catch((err) => {
      ctx.body = new global.errs.HttpException("操作失败");
    });
});

module.exports = router;
