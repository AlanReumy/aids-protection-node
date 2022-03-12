const db = require('../model')
const Router = require('koa-router')
const { success, CODE, fail } = require('../../util/util')
const answerController = require('../controller/answer.controller')

let router = new Router({
  prefix: '/api/answer',
})

let { users } = db

// create
router.post('/create', async (ctx) => {
  let payload = ctx.request.body
  const { title, content, agree, disAgree, userId, questionId } = payload
  await answerController.create({
    title,
    content,
    agree,
    disAgree,
    userId,
    questionId,
  }).then((res) => {
    ctx.body = success(res, '创建成功', CODE.SUCCESS)
  }).catch((err) => {
    ctx.body = fail(err, '创建失败', CODE.BUSINESS_ERROR)
  })
})

// 根据问题查看回答列表
router.get('/list', async (ctx) => {
  const { questionId } = ctx.request.query
  await answerController.findAllByInclude(users, { questionId }).
    then(async (res) => {
      ctx.body = success(res, '查找成功', CODE.SUCCESS)

    }).
    catch((err) => {
      ctx.body = fail(err, '查找失败', CODE.BUSINESS_ERROR)
    })
})

module.exports = router
