const server = require('../index')
const request = require('supertest')(server)
const mongoose = require('mongoose')

const { getUser, getMockModel } = require('../../mockData')
const { getUserModel, createHash, createJwtToken, modelNames: { PRODUCT }, getModel } = require('../../../helpers')
const { assert, expect } = require('chai')
const { OK, UNAUTHORIZED } = require('http-status')


const {
  MODULE_PRODUCTS,
  DELETE_P
} = process.env

const User = getUserModel('USER')
const ProductModel = getModel(PRODUCT)
const mockProduct = getMockModel({ name: PRODUCT, allField: true })

describe('ROUTE:DELETE PRODUCT', () => {

  let user, fakeUser, product, userToken

  before(async () => {
    fakeUser = getUser({ allField: true })
    const hashPassword = await createHash(fakeUser.password)
    product = new ProductModel()

    user = new User({
      ...fakeUser,
      password: hashPassword
    })
    product = new ProductModel(mockProduct)

    product = await product.save()
    user = await user.save()

    userToken = createJwtToken({
      userId: user._id,
      userType: 'USER'
    })
  })

  after(async () => {
    await User.deleteOne({ _id: user._id })
    await ProductModel.deleteOne({ _id: product._id })

    Object.keys(mongoose.connection.models).forEach(modelName => {
      delete mongoose.connection.models[modelName]
    })

    server.close()
  })

  it('should delete the product', async () => {
    const { _id } = product
    let path = MODULE_PRODUCTS + DELETE_P
    path = path.replace(/:productId/, _id)

    const { status, body } = await request
      .delete(path)
      .set('cookie', `token=${userToken}`)
    const { error } = body

    assert.equal(status, OK, `Error : ${error}`)
  })

  it('should not deleting the product with a wrong id', async () => {
    const { _id } = product
    let path = MODULE_PRODUCTS + DELETE_P
    path = path.replace(/:productId/, `${_id}2f44f`)

    const { status, body } = await request
      .delete(path)
      .set('cookie', `token=${userToken}`)
    const { error, message } = body

    assert.equal(status, UNAUTHORIZED, `Error : ${error} Message ${message}`)
  })
})