import { Context } from 'koa'
import { AuthContext } from '../middleware/auth.middleware'
import exchangeItemService from '../service/exchangeItem.service'
import userService from '../service/user.service'
import ErrorTypes from '../constant/error-types'


class ExchangeItemController {
  async create(ctx: AuthContext) {
    const { name, img, count, points } = ctx.request.body
    ctx.body = await exchangeItemService.create(name, img, count, points)
  }

  async exchange(ctx: AuthContext) {
    const { id }: { id: number } = ctx.params
    const { address, addressee, phone } = ctx.request.body
    const { id: userId } = ctx.user!
    const user = await userService.getUserById(userId)
    const exchangeItem =
      await exchangeItemService.getExchangeItemById(id)
    // 判断用户积分是否足够
    if (user?.getDataValue('points')! < exchangeItem?.getDataValue('points')!) {
      const error = new Error(ErrorTypes.NOT_ENOUGH_POINTS)
      return ctx.app.emit('error', error, ctx)
    }
    // 扣除用户积分
    await userService.changeUserCount(user?.getDataValue('id')!, exchangeItem?.getDataValue('points')!, 'decrement')
    // 判断商城数量是否为空
    if (exchangeItem?.getDataValue('count') === 0) {
      const error = new Error(ErrorTypes.NOT_ENOUGH_EXCHANGEITEM)
      return ctx.app.emit('error', error, ctx)
    }
    // 减少商品数量
    await exchangeItemService.changeCount(id, 'decrement')
    // 完成兑换
    ctx.body = await exchangeItemService.exchange(
      exchangeItem?.id!,
      user?.id!,
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
