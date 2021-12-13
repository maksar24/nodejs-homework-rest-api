const { NotFound } = require('http-errors')
const ObjectID = require('mongoose').Types.ObjectId

const { User } = require('../../models')

const updateSubscription = async (req, res) => {
  const { _id } = req.user
  const { subscription } = req.body
  const validationId = ObjectID.isValid(_id)
  if (!validationId) {
    throw new NotFound(`User with id=${_id} not found`)
  }
  const user = await User.findByIdAndUpdate(_id, { subscription }, { new: true })
  if (!user) {
    throw new NotFound(`User with id=${_id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: user
    },
    message: 'User subscription changed'
  })
}

module.exports = updateSubscription
