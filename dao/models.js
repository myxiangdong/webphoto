module.exports = {
    user: {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    picture: {
        uId: String, // 用户Id，一个活动一个用户（管理员）
        num: Number, // 点赞数
        tel: String, // 电话联系，发放奖品依据
        name: String,
        description: String,
        imgSrc: String,
        pass: Boolean // 是否通过审核
    },
    client: {
        ip: String, // 投票ip
        picId: String // 投票对象
    }
}
