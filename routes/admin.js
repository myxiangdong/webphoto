/**
 * Created by Song on 2017/5/6.
 */
module.exports = function ( app ) {
    app.get('/admin', function (req, res) {
        console.log(req.session);
        if(req.session.user){
            var Picture = global.dbHelper.getModel('picture');
            Picture.find({"uId":'song'}, function (error, docs) {
                console.log(docs);
                res.render('admin',{Pictures:docs});
            }).sort({"num": -1});
        }else{
            req.session.error = "请先登录"
            res.redirect('/login');
        }
    });
}