const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')

const { User } = require('../../models')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file
  const { _id: id } = req.user
  console.log(req.file)
  const imageName = `${id}_${originalname}`
  try {
    const image = await Jimp.read(tempUpload)
    image.resize(250, 250).write(tempUpload)
    const resultUpload = path.join(avatarsDir, imageName)
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join('public', 'avatars', imageName)
    await User.findByIdAndUpdate(req.user._id, { avatarURL })
    res.json({ avatarURL })
  } catch (error) {
    await fs.unlink(tempUpload)
    throw error
  }
}

module.exports = updateAvatar
