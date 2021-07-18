import Axios from 'axios'

const {
  REACT_APP_NOTIFICATION_USER_GET,
  REACT_APP_NOTIFICATION_STORE_GET,
  REACT_APP_NOTIFICATION_STORE_FEEDBACK,
  REACT_APP_NOTIFICATION_DELETE,
  REACT_APP_PRODUCT_SEND,
  REACT_APP_PRODUCT_DELETE,
  REACT_APP_PATH_LOGIN,
  REACT_APP_PATH_SIGNUP,
  REACT_APP_LOGOUT,
  REACT_APP_UPDATE_USER,
  REACT_APP_UPDATE_PASSWORD
} = process.env

/**
 * Class Provide all function to interact with BACKEND/API 
 */
class CoreAPI {

  constructor() {
  }

  /**
   * Handling resolve promise form the fetch API 
   * @param {*} response HTTP response 
   * @returns data send from API
   */
  thenHandler = (response) => {
    return response.data
  }

  /**
   * Handling rejet promise from the fetch API 
   * @param {*} ex 
   */
  catchHandler = (ex) => {
    throw ex
  }

  /**
   * Represente a wrapper for the fetch API used.
   * @param {*} config containe http config object
   * @returns 
   */
  fetch = (config) => {
    return Axios(config)
      .then(this.thenHandler)
      .catch(this.catchHandler)
  }
  /**
   * 
   * @param {*} data - user credentials object, 
   * @returns - User data / informations
   */
  signup = async (data) => {
    return this.fetch({
      url: REACT_APP_PATH_SIGNUP,
      data,
      method: 'POST',
    })
  }
  /**
   * 
   * @param {*} data User Credentials
   * @returns User data / informations
   */
  login = async (data) => {
    return this.fetch({
      url: REACT_APP_PATH_LOGIN,
      data: data,
      method: 'POST'
    })
  }

  /**
   * 
   * @param {*} data Object with oldPassword and newPassword 
   * @returns 
   */
  setPassword = async (data) => {
    return this.fetch({
      url: REACT_APP_UPDATE_PASSWORD,
      data,
      method: 'POST'
    })
  }

  /**
   * 
   * @param {*} data Data to update for the user
   * @returns 
   */
  updateUser = async (data) => {
    return this.fetch({
      url: REACT_APP_UPDATE_USER,
      data: {
        forUpdate: {
          ...data
        }
      },
      method: 'POST'
    })
  }
  /**
   * 
   * @param {*} data Product
   * @returns 
   */
  sendProduct = async (data) => {
    return this.fetch({
      url: REACT_APP_PRODUCT_SEND,
      data,
      method: 'POST'
    })
  }

  /**
   * 
   * @param {string} param0 productId
   * @returns 
   */
  deleteProduct = async ({ productId }) => {
    return this.fetch({
      url: `${REACT_APP_PRODUCT_DELETE}\\${productId}`,
      method: 'DELETE',
    })
  }

  /**
   * Delete a response / notification
   * @param {string} param0 productId
   * @param {string} parama1 storeId
   * @returns 
   */
  deleteResponse = async ({ productId, storeId }) => {
    return this.fetch({
      url: `${REACT_APP_NOTIFICATION_DELETE}\\${storeId}\\${productId}`,
      method: 'DELETE'
    })
  }

  /**
   * Get all user notifications / responses
   * @param {*} data 
   * @returns 
   */
  getUserResponses = async (data) => {
    return this.fetch({
      url: REACT_APP_NOTIFICATION_USER_GET,
      data,
      method: 'GET'
    })
  }

  /**
   * Get all notification / requetes
   * @param {*} data 
   * @returns 
   */
  getStoreProducts = async (data) => {
    return this.fetch({
      url: REACT_APP_NOTIFICATION_STORE_GET,
      data,
      method: 'GET',
    })
  }

  /**
   * Logout the current user
   * @returns 
   */
  logout = async () => {
    return this.fetch({
      url: REACT_APP_LOGOUT,
      method: 'POST'
    })
  }

  /**
   * Send store feedback about a product / request.
   * @param {*} data 
   * @returns 
   */
  storeFeedback = async (data) => {
    return this.fetch({
      url: REACT_APP_NOTIFICATION_STORE_FEEDBACK,
      data,
      method: 'POST',
    })
  }

}

export default new CoreAPI()