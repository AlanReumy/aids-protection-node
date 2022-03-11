const db = require("../model");
const Router = require("koa-router");
const upload = require("../util/upload");
const config = require("../config");
const { success, CODE, fail } = require("../util/util");
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
    .then((res) => {
      ctx.body = success(res, '注册成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '注册失败', CODE.BUSINESS_ERROR)
    });
});

//登录
router.post("/login", async (ctx) => {
  let loginUser = ctx.request.body;
  await users
    .findOne({
      where: {
        username: loginUser.username,
      },
    })
    .then((res) => {
      if (res && res.password === loginUser.password) {
        ctx.body = success(res, '登录成功', CODE.SUCCESS)
      } else {
        ctx.body = fail(res, '登录失败', CODE.BUSINESS_ERROR)
      }
    })
    .catch((err) => {
      ctx.body = fail(err, '登录失败', CODE.BUSINESS_ERROR)
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
    .then((res) => {
      ctx.body = success(res, '操作成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '操作失败', CODE.BUSINESS_ERROR)
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
      ctx.body = success(res, '更新成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '更新失败', CODE.BUSINESS_ERROR)
    });
});

// 获取用户信息
router.get("/info", async (ctx) => {
  let userId = ctx.request.query;
  await users
    .findOne({
      where: {
        id: userId,
      },
    })
    .then((res) => {
      ctx.body = success(res, '查找成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '查找成功', CODE.BUSINESS_ERROR)
    });
});

// 查看用户列表
router.get("/list", async (ctx) => {
  await users
    .findAll()
    .then((res) => {
      ctx.body = success(res, '查找成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '查找失败', CODE.BUSINESS_ERROR)
    });
});

module.exports = router;
