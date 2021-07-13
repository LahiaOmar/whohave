
const server = require('../index')
const request = require('supertest')(server)
const { assert, expect } = require('chai')
const { CREATED, UNAUTHORIZED } = require('http-status')

const StoreModel = require('../../../models/userStore')
const UserModel = require('../../../models/user')

const { parseTokenCookie } = require('../../utils')
const { getStore, getUser } = require('../../mockData')

describe('ROUTE:SIGNUP', () => {

  let storesToDelete = [], usersToDelete = []

  after(async () => {
    const users = usersToDelete.map(userId => UserModel.findByIdAndDelete({ _id: userId }))
    await Promise.all(users)

    const stores = storesToDelete.map(storeId => StoreModel.findByIdAndDelete({ _id: storeId }))
    await Promise.all(stores)

    server.close()
  })

  describe('The user signup', () => {
    it('should signup with correct data', async () => {
      const user = getUser({ allField: true })

      const { status, body, headers } = await request
        .post('/api/user/auth/signup')
        .send({
          ...user
        })
      const [token, httpOnly] = parseTokenCookie(headers, ['HttpOnly'])

      assert.notEqual(httpOnly, undefined, 'Token is not HttpOnly')
      assert.notEqual(token, undefined, 'No token found !')
      assert.equal(status, CREATED)
      expect(body).to.contains.keys('userType', 'information')
      assert.isString(body.userType)
      assert.isObject(body.information)

      // to remove user from DB
      const { _id } = body.information
      usersToDelete.push(_id)
    })

    it('should not sign up with incomplete data', async () => {
      const user = getUser({ allField: false })

      const { status, body } = await request
        .post('/api/user/auth/signup')
        .send({
          ...user,
        })
      assert.equal(status, UNAUTHORIZED)
      assert.notEqual(status, CREATED)
    })
  })

  describe('The store signup', () => {
    it('should signup with correct data', async () => {
      const store = getStore({ allField: true })

      const { status, body, headers } = await request
        .post('/api/user/auth/signup')
        .send({
          ...store
        })
      const [token, httpOnly] = parseTokenCookie(headers, ['HttpOnly'])

      assert.notEqual(httpOnly, undefined, 'Token is not HttpOnly')
      assert.notEqual(token, undefined, 'No token found !')
      assert.equal(status, CREATED)

      // to remove store from DB
      const { _id } = body.information
      storesToDelete.push(_id)
    })

    it('sshould not sign up with incomplete data', async () => {
      const store = getStore({ allField: false })

      const { status } = await request
        .post('/api/user/auth/signup')
        .send({
          ...store
        })

      assert.equal(status, UNAUTHORIZED)
      assert.notEqual(status, CREATED)
    })
  })
})