const { Schema, model } = require('mongoose')
const Joi = require('joi')

const codeRegexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    match: codeRegexp
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true }
)

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(codeRegexp).required(),
  favorite: Joi.boolean()
})

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema
}
