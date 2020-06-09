const Like = require('../models/like');
const Dynamic = require('../models/dynamic');

exports.get = function (req, res) {
    let user_id = req.session.userinfo.userid;
    Like.find({
        user_id
    }).populate('dynamic_id').exec((err, docs) => {
        if (err) {
            console.log(err)
            return
        }
        res.json(docs)
    })
}

exports.status_post = function (req, res) {
    let user_id = req.session.userinfo.userid;
    let dynamic_id = req.body.dynamic_id;
    Like.findOne({
        user_id,
        dynamic_id,
    }, (err, doc) => {
        if (err) {
            console.log(err)
            return
        }
        if (doc) {
            return res.json({
                status: 1
            })
        }
        return res.json({
            status: 0
        })
    })
}

exports.post = function (req, res) {
    let user_id = req.session.userinfo.userid;
    let dynamic_id = req.body.dynamic_id;
    let like = new Like({
        user_id,
        dynamic_id,
    })
    like.save((err) => {
        if (err) {
            console.log('Save Error :', err)
        }
    })
    Dynamic.findById({
        _id: dynamic_id
    }, (err, doc) => {
        if (err) {
            console.log(err)
            return;
        }
        doc.likeNumber++;
        doc.save(err => {
            if (err) {
                console.log(err)
            }
        })
        res.json({
            resultCode: 1
        })
    })
}

exports.delete = function (req, res) {
    let user_id = req.session.userinfo.userid;
    let dynamic_id = req.body.dynamic_id;
    Like.find({
        user_id,
        dynamic_id
    }).remove((err) => {
        if (err) {
            console.log(err)
        }
    })
    Dynamic.findById({
        _id: dynamic_id
    }, (err, doc) => {
        if (err) {
            console.log(err)
            return;
        }
        doc.likeNumber--;
        doc.save(err => {
            if (err) {
                console.log(err)
            }
        })
        res.json({
            resultCode: 1
        })
    })
}