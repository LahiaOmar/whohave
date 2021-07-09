import * as provider from './provider'

class CoreAPI {
  constructor() {
    if (provider.signup) {
      this.signup = provider.signup
    }
    if (provider.login) {
      this.login = provider.login
    }
    if (provider.setPassword) {
      this.setPassword = provider.setPassword
    }
    if (provider.updateUser) {
      this.updateUser = provider.updateUser
    }
    if (provider.sendProduct) {
      this.sendProduct = provider.sendProduct
    }
    if (provider.deleteProduct) {
      this.deleteProduct = provider.deleteProduct
    }
    if (provider.deleteResponse) {
      this.deleteResponse = provider.deleteResponse
    }
    if (provider.getUserResponses) {
      this.getUserResponses = provider.getUserResponses
    }
    if (provider.logout) {
      this.logout = provider.logout
    }
    if (provider.getStoreProducts) {
      this.getStoreProducts = provider.getStoreProducts
    }
    if (provider.storeFeedback) {
      this.storeFeedback = provider.storeFeedback
    }
  }
}

export default new CoreAPI()