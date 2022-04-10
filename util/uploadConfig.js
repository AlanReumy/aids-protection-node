//  uploadConfig.js 文件夹
const multer = require('koa-multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    dest: './public/uploads/',
    storage
})

module.exports = upload
