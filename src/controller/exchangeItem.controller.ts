import { Context } from 'koa'

const exchangeItemService = require('../service/exchangeItem.service')
const userService = require('../service/user.service')
const {
  NOT_ENOUGH_POINTS,
  NOT_ENOUGH_EXCHANGEITEM
} = require('../constant/error-types')

class ExchangeItemController {
  async create(ctx: Context) {
    const { name, img, count, points } = ctx.request.body
    ctx.body = await exchangeItemService.create(name, img, count, points)
  }

  async exchange(ctx: Context) {
    const { id } = ctx.params
    const { address, addressee, phone } = ctx.request.body
    const { id: userId } = ctx.user
    const { dataValues: user } = await userService.getUserById(userId)
    const { dataValues: exchangeItem } =
      await exchangeItemService.getExchangeItemById(id)
    // 判断用户积分是否足够
    if (user.points < exchangeItem.points) {
      const error = new Error(NOT_ENOUGH_POINTS)
      return ctx.app.emit('error', error, ctx)
    }
    // 扣除用户积分
    await userService.changeUserCount(user.id, exchangeItem.points, 'decrement')
    // 判断商城数量是否为空
    if (exchangeItem.count === 0) {
      const error = new Error(NOT_ENOUGH_EXCHANGEITEM)
      return ctx.app.emit('error', error, ctx)
    }
    // 减少商品数量
    await exchangeItemService.changeCount(id, 'decrement')
    // 完成兑换
    ctx.body = await exchangeItemService.exchange(
      exchangeItem.id,
      user.id,
      address,
      addressee,
      parseInt(phone)
    )
  }

  async list(ctx: Context) {
    const { offset, limit } = ctx.query
    ctx.body = await exchangeItemService.list(
      parseInt(offset as string),
      parseInt(limit as string)
    )
  }
}

export default new ExchangeItemController()
