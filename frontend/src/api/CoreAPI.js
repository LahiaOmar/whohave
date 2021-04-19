import * as provider from './provider'

export default class CoreAPI {

  constructor(config) {
    if (config.sendProduct) {
      this.sendProduct = provider.sendProduct
    }
    if (config.deleteProduct) {
      this.deleteProduct = provider.deleteProduct
    }
    if (config.deleteResponse) {
      this.deleteResponse = provider.deleteResponse
    }
    if (config.getUserResponses) {
      this.getUserResponses = provider.getUserResponses
    }
    if (config.logout) {
      this.logout = provider.logout
    }
    if (config.getStoreProducts) {
      this.getStoreProducts = provider.getStoreProducts
    }
    if (config.storeFeedback) {
      this.storeFeedback = provider.storeFeedback
    }
  }
}