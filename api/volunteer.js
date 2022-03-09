const db = require("../model");
const Router = require("koa-router");

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
    .then((result) => {
      ctx.body = new global.errs.Success("创建成功");
    })
    .catch((err) => {
      ctx.body = new global.errs.HttpException();
    });
});

// list
router.get("/list", async (ctx) => {
  await volunteers
    .findAll()
    .then(async (result) => {
      ctx.body = new global.errs.Success({
        info: {
          result,
        },
        res: "查找成功",
      });
    })
    .catch((err) => {
      ctx.body = new global.errs.HttpException();
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
      ctx.body = new global.errs.Success({
        res: "预约成功",
      });
    })
    .catch((err) => {
      ctx.body = new global.errs.HttpException();
    });
});

module.exports = router;
