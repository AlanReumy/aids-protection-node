const db = require("../model");
const Router = require("koa-router");

let router = new Router({
  prefix: "/api/answer",
});

let { questions, answers, users } = db;

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
    .then((result) => {
      ctx.body = new global.errs.Success("创建成功");
    })
    .catch((err) => {
      ctx.body = new global.errs.HttpException();
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
    .then(async (result) => {
      ctx.body = new global.errs.Success({
        info: result,
        res: "查找成功",
      });
    })
    .catch((err) => {
      console.log(err);
      ctx.body = new global.errs.HttpException();
    });
});

module.exports = router;
