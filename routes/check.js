/**
 * Created by Song on 2017/5/6.
 */
module.exports = function ( app ) {
    app.post('/check', function (req, res) {
        var picId = req.body.picId;
        console.log(req.session);
        if(req.session.user){
            var Picture = global.dbHelper.getModel('picture');
            Picture.update({"_id": picId},{$set:{pass: true}}, function (error, doc) {
                if(doc){
                    // 审核成功
                    console.log('success');
                    res.sendStatus(200);
                }else {
                    throw new Error("数据更新失败")
                }
            });
        }else{
            req.session.error = "请先登录";
            res.redirect('/login');
        }
    });
}