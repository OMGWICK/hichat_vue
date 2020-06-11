const Collection = require('../models/collection')
const Dynamic = require('../models/dynamic');

exports.get= function(req,res){
    let user_id =req.session.userinfo.userid;
    Collection.find({user_id}).populate({path:'dynamic_id',populate:{path:'writer'}}).exec((err,docs)=>{
        if(err){
            console.log(err)
            return
        }
        res.json(docs)
    })
}

exports.status_post = function(req,res){
    let user_id=req.session.userinfo.userid;
    let dynamic_id = req.body.dynamic_id;
    Collection.find({
        user_id,
        dynamic_id,
    },(err,doc)=>{
        if(err){
            console.log(err)
            return
        }
        if(doc.length!=0){
            return res.json({status:1})
        }
        return res.json({status:0})
    })
}

exports.post = function (req, res) {
    let user_id = req.session.userinfo.userid;
    let dynamic_id = req.body.dynamic_id;
    let collection = new Collection({
        user_id,
        dynamic_id,
    })
    collection.save((err) => {
        if (err) {
            console.log('Save Error :', err)
        }
        res.json({msg:"增加成功"})
    })
    // Collection.findById({
    //     _id: dynamic_id
    // }, (err, doc) => {
    //     if (err) {
    //         console.log(err)
    //         return;
    //     }
    //     if (doc) {
    //         doc.collectState = 1;
    //         doc.save(err => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //         })
    //         res.json({
    //             resultCode: 1
    //         })
    //     }
    // })
}

exports.delete = function (req, res) {
    let user_id = req.session.userinfo.userid;
    let dynamic_id = req.body.dynamic_id;
    Collection.find({
        user_id,
        dynamic_id
    }).remove((err)=>{
        if(err){
            console.log(err)
        }
        res.json({msg:"取消成功"})
    })
    // Dynamic.findById({
    //     _id: dynamic_id
    // }, (err, doc) => {
    //     if (err) {
    //         console.log(err)
    //         return;
    //     }
    //     if (doc) {
    //         doc.collectState = 0;
    //         doc.save(err => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //         })
    //         res.json({
    //             resultCode: 1
    //         })
    //     }
    // })
}