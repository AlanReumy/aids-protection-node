const db = require('../model/index')

class ExchangeItemService {
    async create(name, img, count, points) {
        return await db.exchangeItem.create({ name, img, count, points })
    }

    async getExchangeItemById(id) {
        return await db.exchangeItem.findOne({ where: { id } })
    }

    async changeCount(id, type) {
        const exchangeItem = await db.exchangeItem.findOne({ where: { id } })
        return await exchangeItem[type]('count')
    }

    async list(offset, limit) {
        return await db.exchangeItem.findAll({ offset, limit })
    }

    async exchange(exchangeItemId, userId, address, addressee, phone) {
        return await db.exchangeItem_user.create({
            exchangeItemId,
            userId,
            address,
            addressee,
            phone
        })
    }
}

module.exports = new ExchangeItemService()
