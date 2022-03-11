const db = require("../model");
const Router = require("koa-router");
const { success, CODE, fail } = require("../util/util");

let router = new Router({
  prefix: "/api/answer",
});

let { answers, users } = db;

// create
router.post("/create", async (ctx) => {
  let payload = ctx.request.body;
  const { title, content, agree, disAgree, userId, questionId } = payload;
  await answers
    .create({
      title,
      content,
      agree,
      disAgree,
      userId,
      questionId,
    })
    .then((res) => {
      ctx.body = success(res, '创建成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '创建失败', CODE.BUSINESS_ERROR)
    });
});

// 根据问题查看回答列表
router.post("/list", async (ctx) => {
  const { questionId } = ctx.request.body;
  await answers
    .findAll({
      where: {
        questionId,
      },
      include: {
        model: users,
      },
    })
    .then(async (res) => {
      ctx.body = success(res, '查找成功', CODE.SUCCESS)

    })
    .catch((err) => {
      ctx.body = fail(err, '查找失败', CODE.BUSINESS_ERROR)
    });
});

module.exports = router;
