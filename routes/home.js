/**
 * Created by Song on 2017/5/6.
 */
module.exports = function ( app ) {
    app.get('/home', function (req, res) {
        var Picture = global.dbHelper.getModel('picture');
        Picture.find({"uId":'song',"pass": true}, function (error, docs) {
            console.log(docs);
            for(var i in docs){
                docs[i].tel = docs[i].tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            }
            res.render('home',{Pictures:docs});
        }).sort({"num": -1});
    });
}