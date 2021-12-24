const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { v4: uuidv4 } = require('uuid')

const { User } = require('../../models')
const { sendMessage } = require('./../../helpers')

const register = async (req, res) => {
  const { password, email, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`Email ${email} in use`)
  }
  const verificationToken = uuidv4()
  const avatarURL = gravatar.url(email, { protocol: 'https' })
  const newUser = new User({ email, subscription, avatarURL, verificationToken })
  newUser.setPassword(password)
  await newUser.save()
  const message = {
    to: email,
    subject: 'Confirm user',
    html: `<a target='_blank' href=http://localhost:3000/api/users/verify/${verificationToken} >click to confirm</a>`,
  }
  await sendMessage(message)
  res.status(201).json({
    status: 'Created',
    code: 201,
    data: {
      user: {
        email,
        subscription: 'starter',
        avatarURL,
        verificationToken
      }
    }
  })
}

module.exports = register
