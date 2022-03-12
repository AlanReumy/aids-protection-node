class Controller {
  constructor (model) {
    this.model = model
  }

  /**
   * 创建数据
   * @param {*} info 创建的信息
   * @returns 新创建的数据
   */
  create (info) {
    return this.model.create({
      ...info,
    })
  }

  /**
   * 查找单条数据
   * @param {*} info where的信息
   * @returns 找到的内容
   */
  findOne (info) {
    return this.model.findOne({
      where: {
        ...info,
      },
    })
  }

  /**
   *
   * @returns 返回list
   */
  findAll (info) {
    return this.model.findAll({
      where: info,
    })
  }

  /**
   * 联表查询
   * @param includeModel
   * @param info
   * @returns {返回list|Promise<Model[]>|*}
   */
  findAllByInclude (includeModel, info = {}) {
    return this.model.findAll({
      where: info,
      include: {
        model: includeModel,
      },
    })
  }

  /**
   * 更新数据
   * @param {*} id 数据id
   * @param {*} info 数据要更新的信息
   * @returns 1
   */
  update (id, info) {
    return this.model.update(
      {
        ...info,
      },
      {
        where: {
          id,
        },
      },
    )
  }

  /**
   * 删除数据
   * @param {*} id 数据id
   * @returns 1
   */
  delete (id) {
    return this.model.delete({
      where: {
        id,
      },
    })
  }
}

module.exports = Controller
