const db = require("../model");
const Router = require("koa-router");

let router = new Router({
  prefix: "/api/question",
});

let { questions, users } = db;

// create
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

// list
router.get("/list", async (ctx) => {
  await questions
    .findAll()
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
