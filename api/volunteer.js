const model = require("../model");
const Router = require("koa-router");
let router = new Router({
  prefix: "/api/volunteer",
});

let Volunteer = model.Volunteer; //获取User模型

// create
router.post("/create", async (ctx) => {
  let payload = ctx.request.body;
  const { title, desc, startDate } = payload;
  await Volunteer.create({
    title,
    desc,
    startDate,
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
  await Volunteer.findAll()
    .then((result) => {
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
