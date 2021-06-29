import Axios from 'axios'

const {
  REACT_APP_NOTIFICATION_USER_GET,
  REACT_APP_NOTIFICATION_STORE_GET,
  REACT_APP_NOTIFICATION_STORE_FEEDBACK,
  REACT_APP_NOTIFICATION_DELETE,
  REACT_APP_PRODUCT_SEND,
  REACT_APP_PRODUCT_DELETE,
  REACT_APP_PATH_LOGIN,
  REACT_APP_LOGOUT,
} = process.env

export const sendProduct = (data) => {
  return Axios.post(
    REACT_APP_PRODUCT_SEND,
    data
  )
    .then(response => response.data)
    .catch(err => err)
}

export const deleteProduct = ({ productId }) => {
  return Axios.delete(
    `${REACT_APP_PRODUCT_DELETE}\\${productId}` ,
  )
    .then(response => response.data)
    .catch(err => err)
}

export const deleteResponse = ({ productId, storeId }) => {
  return Axios.delete(
    `${REACT_APP_NOTIFICATION_DELETE}\\${storeId}\\${productId}`
  )
    .then(response => response.data)
    .catch(err => err)
}

export const getUserResponses = (data) => {
  return Axios.get(
    REACT_APP_NOTIFICATION_USER_GET,
    data
  )
    .then(response => response.data)
    .catch(err => err)
}

export const getStoreProducts = (data) => {
  return Axios.get(
    REACT_APP_NOTIFICATION_STORE_GET,
    data
  )
    .then(response => response.data)
    .catch(err => err)
}

export const logout = () => {
  return Axios.post(
    REACT_APP_LOGOUT
  )
    .then(response => response.data)
    .catch(err => err)
}

export const storeFeedback = (data) => {
  return Axios.post(
    REACT_APP_NOTIFICATION_STORE_FEEDBACK,
    data
  )
    .then(response => response.data)
    .catch(err => err)
}