const db = require("../model");
const Router = require("koa-router");

let router = new Router({
  prefix: "/api/comment",
});

let { answers, comments, users } = db;

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
    .then((result) => {
      ctx.body = new global.errs.Success("创建成功");
    })
    .catch((err) => {
      console.log(err);
      ctx.body = new global.errs.HttpException();
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
