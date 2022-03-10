const db = require("../model");
const Router = require("koa-router");

let router = new Router({
  prefix: "/api/question",
});

let { questions, users } = db;

// 创建问题
router.post("/create", async (ctx) => {
  let payload = ctx.request.body;
  const { title, desc, userId } = payload;
  await questions
    .create({
      title,
      desc,
      userId,
    })
    .then((result) => {
      ctx.body = new global.errs.Success("创建成功");
    })
    .catch((err) => {
      ctx.body = new global.errs.HttpException();
    });
});

// 查看问题列表
router.get("/list", async (ctx) => {
  await questions
    .findAll({
      include: {
        model: users,
      },
    })
    .then(async (result) => {
      ctx.body = new global.errs.Success({
        info: result,
        res: "查找成功",
      });
    })
    .catch((err) => {
      ctx.body = new global.errs.HttpException();
    });
});

// 根据用户id查询问题列表
router.post("/list", async (ctx) => {
  let { userId } = ctx.request.body;
  await questions
    .findAll({
      where: {
        user_id: userId,
      },
    })
    .then(async (result) => {
      ctx.body = new global.errs.Success({
        info: result,
        res: "查找成功",
      });
    })
    .catch((err) => {
      ctx.body = new global.errs.HttpException();
    });
});

module.exports = router;
