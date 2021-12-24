const { BadRequest, NotFound } = require('http-errors')

const { User } = require('./../../models')
const { sendMessage } = require('./../../helpers')

const reVerify = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw BadRequest('Missing required field email')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound(`User with email=${email} not found`)
  }
  if (user.verify) {
    throw BadRequest('Verification has already been passed')
  }
  const message = {
    to: email,
    subject: 'Confirm user',
    html: `<a target='_blank' href=http://localhost:3000/api/users/verify/${user.verificationToken} >click to confirm</a>`,
  }
  await sendMessage(message)
  res.status(200).json({
    code: 200,
    message: 'Verification email sent'
  })
}

module.exports = reVerify
