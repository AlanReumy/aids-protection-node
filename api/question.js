const db = require("../model");
const Router = require("koa-router");
const { success, CODE, fail } = require("../util/util");

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
    .then((res) => {
      ctx.body = success(res, '创建成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '创建失败', CODE.BUSINESS_ERROR)
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
    .then((res) => {
      ctx.body = success(res, '查找成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '查找失败', CODE.BUSINESS_ERROR)
    });
});

// 根据用户id查询问题列表
router.get("/list/userId", async (ctx) => {
  let userId = ctx.request.query;
  await questions
    .findAll({
      where: {
        user_id: userId,
      },
    })
    .then((res) => {
      ctx.body = success(res, '操作成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '操作成功', CODE.BUSINESS_ERROR)
    });
});

module.exports = router;
