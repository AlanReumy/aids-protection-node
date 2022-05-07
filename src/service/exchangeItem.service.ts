import db from '../model'

class ExchangeItemService {
  async create(name: string, img: string, count: number, points: number) {
    return await db.exchangeItem?.create({ name, img, count, points })
  }

  async getExchangeItemById(id: number) {
    return await db.exchangeItem?.findOne({ where: { id } })
  }

  async changeCount(id: number) {
    // TODO 自减
    return await db.exchangeItem?.update({ count: 1 }, { where: { id } })
  }

  async list(offset: number, limit: number) {
    return await db.exchangeItem?.findAll({ offset, limit })
  }

  async exchange(
    exchangeItemId: number,
    userId: number,
    address: string,
    addressee: string,
    phone: number
  ) {
    return await db.exchangeItem_user?.create({
      exchangeItemId,
      userId,
      address,
      addressee,
      phone
    })
  }
}
export default new ExchangeItemService()
