export const DELETE_PRODUCT = "deleteProduct"
export const SEND_PRODUCT = "sendProduct"

export const actionFactory = (action) => {
  return {
    [action]: true
  }
}