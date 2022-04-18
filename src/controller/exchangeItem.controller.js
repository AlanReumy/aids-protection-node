const exchangeItemService = require('../service/exchangeItem.service')
const userService = require('../service/user.service')
const {
    NOT_ENOUGH_POINTS,
    NOT_ENOUGH_EXCHANGEITEM
} = require('../constant/error-types')

class ExchangeItemController {
    async create(ctx) {
        const { name, img, count, points } = ctx.request.body
        ctx.body = await exchangeItemService.create(name, img, count, points)
    }

    async exchange(ctx) {
        const { id } = ctx.params
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
        await userService.changeUserCount(
            user.id,
            exchangeItem.points,
            'decrement'
        )
        // 判断商城数量是否为空
        if (exchangeItem.count === 0) {
            const error = new Error(NOT_ENOUGH_EXCHANGEITEM)
            return ctx.app.emit('error', error, ctx)
        }
        // 减少商品数量
        ctx.body = await exchangeItemService.changeCount(id, 'decrement')
    }
}

module.exports = new ExchangeItemController()
