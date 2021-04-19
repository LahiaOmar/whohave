import CoreAPI from '../../api/CoreAPI'

const dashboardAPI = new CoreAPI({
  getStoreProducts: true,
  logout: true,
  storeFeedback: true
})

export default dashboardAPI