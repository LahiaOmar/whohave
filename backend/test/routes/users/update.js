const server = require('../index')
const request = require('supertest')(server)
const { assert } = require('chai')
const { OK, UNAUTHORIZED } = require('http-status')
const mongoose = require('mongoose')

const User = require('../../../models/user')
const Store = require('../../../models/userStore')
const { getUser, getStore } = require('../../mockData')
const { createHash, createJwtToken } = require('../../../helpers')

const {
  MODULE_USERS,
  UPDATE_PASSWORD,
  UPDATE
} = process.env

describe('ROUTE:SET_PASSWORD and ROUTE:SET_INFORMATION', () => {

  let user, store, fakeUser, fakeStore, userToken, storeToken

  before(async () => {
    fakeStore = getStore({ allField: true })
    fakeUser = getUser({ allField: true })

    const hashStorePassword = await createHash(fakeStore.password)
    const hashUserPassword = await createHash(fakeUser.password)

    user = new User({
      ...fakeUser,
      password: hashUserPassword
    })
    user = await user.save()
    store = new Store({
      ...fakeStore,
      password: hashStorePassword
    })

    // jwt creation
    userToken = createJwtToken({ userId: user._id, userType: 'USER' })
    storeToken = createJwtToken({ userId: store._id, userType: 'STORE' })
  })

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

  describe('User update password and some informations', () => {
    it('Should be update pasword', async () => {
      const { password: oldPassword } = fakeUser

      const { status, body } = await request
        .post(MODULE_USERS + UPDATE_PASSWORD)
        .send({
          oldPassword,
          newPassword: 'password1234'
        })
        .set('cookie', `token=${userToken}`)

      assert.equal(status, OK)
    })

    it('Should not update the password with a wrong one', async () => {
      const { password: oldPassword } = fakeUser

      const { status } = await request
        .post(MODULE_USERS + UPDATE_PASSWORD)
        .send({
          oldPassword: 'testteste134',
          newPassword: 'password1234'
        })
        .set('cookie', `token=${userToken}`)

      assert.equal(UNAUTHORIZED, status)
    })

    it('should update the USER information', async () => {
      let { firstName, lastName } = fakeUser;
      [firstName, lastName] = [lastName, firstName];

      const { status, body } = await request
        .post(MODULE_USERS + UPDATE)
        .send({
          forUpdate: {
            firstName, lastName
          }
        })
        .set('cookie', `token=${userToken}`)
      const { userData } = body

      assert.equal(status, OK)
      assert.equal(userData.firstName, fakeUser.lastName)
      assert.equal(userData.lastName, fakeUser.firstName)
    })

    it('should not update the USER information', async () => {
      let { firstName, lastName } = fakeUser;
      [firstName, lastName] = [lastName, firstName];

      const { status } = await request
        .post(MODULE_USERS + UPDATE)
        .send({
          forUpdate: {
            firstName, lastName
          }
        })

      assert.equal(status, UNAUTHORIZED)
    })

  })
})
