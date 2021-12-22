const { Schema, SchemaTypes, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: [true, 'AvatarURL is required'],
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true }
)

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const joiSignUpSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string()
})

const joiLogInSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required()
})

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required()
})

const joiVerifySchema = Joi.object({
  email: Joi.string().email().required()
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSignUpSchema,
  joiLogInSchema,
  joiSubscriptionSchema,
  joiVerifySchema
}
