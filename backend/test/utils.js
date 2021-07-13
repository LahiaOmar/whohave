/**
 * To parse set-token field from the headers object,
 * 
 * @param {Array} headers - http headers  
 * @param {Array} attributes - http attibute to get
 * @returns {Array} Array of attributes values
 */
const parseTokenCookie = (headers, attributes) => {
  attributes = ['token=', ...attributes]
  const cookies = headers['set-cookie']
    .find(cookie => cookie.startsWith('token='))
    .split(';')
    .map(cookie => cookie.trim())

  return attributes.map(attribute => {
    return cookies.find(cookie => cookie.startsWith(attribute))
  })
}

module.exports = {
  parseTokenCookie
}