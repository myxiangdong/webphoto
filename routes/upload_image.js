module.exports = function(app) {
    var multer = require('multer');
    var upload = multer({
        dest: 'public/images/'
    });
    app.get('/upload_image', function(req, res) {
        res.render('upload_image');
    });
}
