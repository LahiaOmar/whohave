const server = require('../index')
const request = require('supertest')(server)

const { assert, expect } = require('chai')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { ACCEPTED } = require('http-status')

const User = require('../../../models/user')
const Store = require('../../../models/userStore')
const { getStore, getUser } = require('../../mockData')

/**
 * Login :
 *  - User : 
 *    - wrong credentials
 *    - Good credentials
 *  - Store : 
 *    - wrong credentials
 *    - Good credentials
 */

describe('ROUTE:LOGIN', () => {

  let user, store, fakeUser, fakeStore

  // create users
  before(async () => {
    fakeStore = getStore()
    fakeUser = getUser()
    const hashStorePassword = await bcrypt.hash(fakeStore.password, 10)
    const hashUserPassword = await bcrypt.hash(fakeUser.password, 10)

    user = new User({
      ...fakeUser,
      password: hashUserPassword
    })
    user = await user.save()
    store = new Store({
      ...fakeStore,
      password: hashStorePassword
    })
    store = await store.save()
  })

  // remove the users
  after(async () => {
    if (user)
      await User.deleteOne({ _id: user._id })
    if (store)
      await Store.deleteOne({ _id: store._id })
    Object.keys(mongoose.connection.models).forEach(modelName => {
      delete mongoose.connection.models[modelName]
    })
    server.close()
  })

  describe("when the User Log in", () => {

    it('should log in with the correct credentials', async () => {
      const { email, password, userType } = fakeUser

      const { status } = await request
        .post('/api/user/auth/login')
        .send({
          email,
          password,
          userType
        })

      assert.equal(status, ACCEPTED)
    })
    it('should not log in with wrong credentials', async () => {
      const { email, password, userType } = fakeUser

      const { status } = await request
        .post('/api/user/auth/login')
        .send({
          email,
          password: password + 'test',
          userType
        })

      assert.notEqual(status, ACCEPTED)
    })

  })
  describe('when the Store Log in', () => {
    it('should log in with the correct credentials', async () => {
      const { email, password, userType } = fakeStore

      const { status } = await request
        .post('/api/user/auth/login')
        .send({
          email,
          password,
          userType
        })

      assert.equal(status, ACCEPTED)
    })
    it('should not log in with wrong credentials', async () => {
      const { email, password, userType } = fakeStore

      const { status, text } = await request
        .post('/api/user/auth/login')
        .send({
          email,
          password: password + 'test',
          userType
        })

      assert.notEqual(status, ACCEPTED)
    })
  })

})
