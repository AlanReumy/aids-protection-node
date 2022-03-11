const db = require("../model");
const Router = require("koa-router");
const { success, CODE, fail } = require("../util/util");

let router = new Router({
  prefix: "/api/comment",
});

let { comments, users } = db;

// create
router.post("/create", async (ctx) => {
  let payload = ctx.request.body;
  const { content, answerId, userId } = payload;
  await comments
    .create({
      content,
      answerId,
      userId,
    })
    .then((res) => {
      ctx.body = success(res, '创建成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '创建失败', CODE.BUSINESS_ERROR)
    });
});

// list
router.post("/list", async (ctx) => {
  const { answerId } = ctx.request.body;
  await comments
    .findAll({
      where: {
        answerId,
      },
      include: {
        model: users,
      },
    })
    .then((res) => {
      ctx.body = success(res, '创建成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '创建失败', CODE.BUSINESS_ERROR)
    });
});

module.exports = router;
