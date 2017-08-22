module.exports = function(app) {
    var multer = require('multer');
    var upload = multer({
        dest: 'public/images/'
    });
    app.get('/upload_compress', function(req, res) {
        res.render('upload_compress');
    });
    app.post('/upload_compress', upload.array('file', 2), function(req, res, next) {
        console.log(req);
        var responseData = [];
        var Picture = global.dbHelper.getModel('picture');
        try {
            for (var i = 0; i < req.files.length; i++) {
                // todo: 根据电话号码查看是否已经存在过记录
                Picture.create({
                    uId: 'song',
                    tel: req.body.tel,
                    name: req.files[i].originalname,
                    description: req.body.desc,
                    imgSrc: req.files[i].filename,
                    num: 0,
                    // todo: 完成审核功能再改为false
                    pass: false
                });

                responseData.push({
                    type: req.files[i].type,
                    name: req.files[i].filename,
                    path: '/images/' + req.files[i].filename,
                    size: req.files[i].size / 1024 > 1024 ? (~~(10 * req.files[i].size / 1024 / 1024)) / 10 + "MB" : ~~(req.files[i].size / 1024) + "KB"
                });
            }
            // res.sendStatus(200);
            res.writeHead(200);
            res.end(JSON.stringify(responseData));
        } catch (e) {
            res.sendStatus(404);
        }
    });
}
