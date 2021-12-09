const { Conflict } = require('http-errors')

const { User } = require('../../models')

const register = async (req, res) => {
  const { password, email, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`Email ${email} in use`)
  }
  const newUser = new User({ email, subscription })
  newUser.setPassword(password)
  newUser.save()
  res.status(201).json({
    status: 'Created',
    code: 201,
    data: {
      user: {
        email,
        subscription: 'starter'
      }
    }
  })
}

module.exports = register
