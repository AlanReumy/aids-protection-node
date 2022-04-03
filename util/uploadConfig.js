//  uploadConfig.js 文件夹
const multer = require('koa-multer')

let storage = multer.diskStorage({
    //文件保存路径 这个路由是以项目文件夹 也就是和入口文件（如app.js同一个层级的）
    destination: function (req, file, cb) {
        cb(null, 'public/images') // 储存到 public/images文件夹里
    },
    //修改文件名称
    filename: function (req, file, cb) {
        let fileFormat = file.originalname.split('.') //以点分割成数组，数组的最后一项就是后缀名
        cb(null, 'joe' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})

let upload = multer({
    storage: storage,
    limits: {
        fileSize: (1024 * 1024 * 10) / 2 // 限制512KB
    }
})

module.exports = upload
