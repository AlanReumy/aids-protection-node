const db = require("../model");
const Router = require("koa-router");
const { success, CODE, fail } = require("../util/util");

let router = new Router({
  prefix: "/api/volunteer",
});

let { volunteers, userVolunteers, users } = db; //获取User模型

// create
router.post("/create", async (ctx) => {
  let payload = ctx.request.body;
  const { title, desc, startDate } = payload;
  await volunteers
    .create({
      title,
      desc,
      startDate,
    })
    .then((res) => {
      ctx.body = success(res, '创建成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '创建失败', CODE.BUSINESS_ERROR)
    });
});

// list
router.get("/list", async (ctx) => {
  await volunteers
    .findAll()
    .then((res) => {
      ctx.body = success(res, '查找成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '查找失败', CODE.BUSINESS_ERROR)
    });
});

// booking
router.post("/booking", async (ctx) => {
  let payload = ctx.request.body;
  const { userId, volunteerId } = payload;
  const user = await users.findOne({
    where: {
      id: userId,
    },
  });
  const volunteer = await volunteers.findOne({
    where: {
      id: volunteerId,
    },
  });
  await volunteer
    .setUsers(user)
    .then((res) => {
      ctx.body = success(res, '预约成功', CODE.SUCCESS)
    })
    .catch((err) => {
      ctx.body = fail(err, '预约失败', CODE.BUSINESS_ERROR)
    });
});

module.exports = router;
