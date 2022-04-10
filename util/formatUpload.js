const formatUpload = (ctx) => {
    const res = {
        images: ctx.host + '\\' + ctx.req.file.path
    }
    res.images = res.images
        .replace(new RegExp('\\\\', 'g'), '/')
        .replace('/public', '')
    return res
}

module.exports = formatUpload