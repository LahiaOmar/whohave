import CoreAPI from '../../api/CoreAPI'

const dashboardAPI = new CoreAPI({
  deleteProduct: true,
  sendProduct: true,
  deleteResponse: true,
  getUserResponses: true,
  logout: true
})

export default dashboardAPI