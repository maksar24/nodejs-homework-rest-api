const multer = require('multer')
const path = require('path')
const { BadRequest } = require('http-errors')

const tempDir = path.join(__dirname, '../', 'temp')

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048
  }
})

const upload = multer({
  storage: multerConfig,
  fileFilter(req, file, cb) {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      return cb(new BadRequest('Only images allowed'))
    }
    cb(null, true)
  },
})

module.exports = upload
