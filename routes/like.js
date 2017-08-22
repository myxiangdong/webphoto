/**
 * Created by Song on 2017/5/6.
 */
function getClientIP(req) {
    var ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var tests = {
        a: req.headers['x-real-ip'] ? req.headers['x-real-ip']:null,
        b: req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for']:null,
        c: req.connection.remoteAddress ? req.connection.remoteAddress:null,
        d: req.socket.remoteAddress ? req.socket.remoteAddress:null,
        // e: req.connection.socket.remoteAddress ? req.connection.socket.remoteAddress:null
    }
    // return ip.match(/\d+\.\d+\.\d+\.\d+/)[0]
    console.log(tests)
    return ip;
}

module.exports = function ( app ) {
    app.post('/like', function (req, res) {
        var ip = getClientIP(req);
        var picId = req.body.picId;
        console.log(ip);
        var Client = global.dbHelper.getModel('client');
        var Picture = global.dbHelper.getModel('picture');

        Picture.findOne({"_id": picId}, function (error, doc) {
            if(error){
                // 服务器内部错误
                res.sendStatus(500);
            }else if(!doc){
                // 投票对象不存在
                res.sendStatus(404);
            } else {
                var like = doc.num;

                Client.findOne({"picId": picId, "ip": ip}, function (error, doc) {
                    if (error) {
                        // 服务器内部错误
                        res.sendStatus(500);
                    } else if (!doc) {
                        try{
                            Client.create({
                                ip: ip,
                                picId: picId
                            }, function (error, doc) {
                                if(doc){
                                    Picture.update({"_id": picId},{$set:{num: ++like}}, function (error, doc) {
                                        if(doc){
                                            // 投票成功
                                            console.log('success');
                                            res.sendStatus(200);
                                        }else {
                                            throw new Error("数据更新失败")
                                        }
                                    });
                                } else {
                                    throw new Error("投票失败")
                                }
                            });
                        }catch (e){
                            // 数据库操作失败
                            res.sendStatus(404);
                        }
                    } else {
                        // 记录已存在
                        res.sendStatus(404);
                    }
                });
            }
        })
    });
}