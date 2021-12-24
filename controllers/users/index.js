const register = require('./register')
const login = require('./login')
const getCurrent = require('./getCurrent')
const logout = require('./logout')
const updateSubscription = require('./updateSubscription')
const updateAvatar = require('./updateAvatar')
const verifyMessage = require('./verifyMessage')
const reVerify = require('./reVerify')

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyMessage,
  reVerify
}
