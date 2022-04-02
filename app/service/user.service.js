const Router = require('koa-router')
const upload = require('../../util/upload')
const config = require('../../config')
const userController = require('../controller/user.controller')
const { success, CODE, fail } = require('../../util/util')
const { SECRET } = require('../../app')
const jsonwebtoken = require('jsonwebtoken')
const tokenVerify = require('../../util/tokenVerify')
const { genSign, deSign } = require('../../util/crypto')
const mime = require('mime-types')
const path = require('path')
const fs = require('fs')

let router = new Router({
    prefix: '/api/user'
})

//注册
router.post('/register', async (ctx) => {
    let registerUser = ctx.request.body
    let { username, password, phone } = registerUser
    password = genSign(password)
    await userController
        .create({
            username,
            password,
            phone,
            isVolunteer: false,
            isPatient: false,
            isDoctor: false,
            integral: 0
        })
        .then((res) => {
            ctx.body = success(res, '注册成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '注册失败', CODE.BUSINESS_ERROR)
        })
})

// 创建用户
router.post('/create', async (ctx) => {
    const {
        username,
        password,
        phone,
        isVolunteer,
        isDoctor,
        isPatient,
        integral
    } = ctx.request.body
    await userController
        .create({
            username,
            isVolunteer,
            password,
            phone,
            isDoctor,
            isPatient,
            integral
        })
        .then((res) => {
            console.log(res)
            ctx.body = success(res, '注册成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '注册失败', CODE.BUSINESS_ERROR)
        })
})

//登录
router.post('/login', async (ctx) => {
    let loginUser = ctx.request.body
    const password = genSign(loginUser.password)
    await userController
        .findOne({ username: loginUser.username })
        .then((res) => {
            if (res && res.password === password) {
                ctx.body = success(
                    {
                        userInfo: res,
                        token: jsonwebtoken.sign(
                            { name: res.username, id: res.id },
                            SECRET,
                            { expiresIn: '10000h' }
                        )
                    },
                    '登录成功',
                    CODE.SUCCESS
                )
            } else {
                ctx.body = fail(res, '密码错误', CODE.BUSINESS_ERROR)
            }
        })
        .catch((err) => {
            ctx.body = fail(err, '登录失败', CODE.BUSINESS_ERROR)
        })
})

// 成为志愿者
router.post('/bevolunteer', async (ctx) => {
    const userId = tokenVerify(ctx)
    await userController
        .update(userId, { isVolunteer: true })
        .then((res) => {
            ctx.body = success(res, '操作成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '操作失败', CODE.BUSINESS_ERROR)
        })
})

// 上传用户头像
router.post('/upload', async (ctx) => {
    ctx.body = success(
        { avatar: ctx.request.files.file.path },
        '上传成功',
        CODE.SUCCESS
    )
})

// 修改用户信息
router.post('/update', async (ctx) => {
    const id = tokenVerify(ctx)
    let {
        username,
        password,
        phone,
        integral,
        isVolunteer,
        isPatient,
        isDoctor,
        avatar
    } = ctx.request.body
    password = genSign(password)
    await userController
        .update(id, {
            username,
            password,
            phone,
            integral,
            isVolunteer,
            isPatient,
            isDoctor,
            avatar
        })
        .then((res) => {
            ctx.body = success(res, '更新成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '更新失败', CODE.BUSINESS_ERROR)
        })
})

// 获取用户信息
router.get('/info', async (ctx) => {
    const id = tokenVerify(ctx)
    await userController
        .findOne({ id })
        .then((res) => {
            // 解密
            res.dataValues.password = deSign(res.dataValues.password)
            ctx.body = success(res, '查找成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '查找成功', CODE.BUSINESS_ERROR)
        })
})

// 查看用户列表
router.get('/list', async (ctx) => {
    await userController
        .findAll()
        .then((res) => {
            ctx.body = success(res, '查找成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '查找失败', CODE.BUSINESS_ERROR)
        })
})

// 删除单个用户
router.delete('/delete', async (ctx) => {
    let { id } = ctx.request.body
    await userController
        .delete(id)
        .then((res) => {
            ctx.body = success(res, '删除成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '删除失败', CODE.BUSINESS_ERROR)
        })
})

module.exports = router
