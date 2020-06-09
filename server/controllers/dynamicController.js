const Dynamic = require('../models/dynamic');
const User=require('../models/users');

exports.post = function (req, res) {
    // console.log(req.body)
    let content = req.body.content;
    let addTime = req.body.addTime;
    let writer = req.session.userinfo.userid;
    let imgUrl = req.body.imgUrl;
    if (!content) {
        res.end()
    } else {
        let dynamic = new Dynamic({
            content,
            addtime: addTime,
            writer,
            imgUrl,
        });
        dynamic.save((err) => {
            if(err){
            console.log(err)
        }
        })
        res.json({msg:'发表成功'});
    }
};

exports.get =function(req,res){
    Dynamic.find({}).populate('writer').exec((err,docs)=>{
        if(err){
            console.log(err);
            return;
        }
        // console.log(docs)
        res.json(docs);
    })
};
exports.page_get =async function(req,res){
    let page = req.query.pageNumber;
    let pageSize = req.query.pageSize;
    try{
    let total =await Dynamic.countDocuments({});
    let docs =await Dynamic.find({}).sort({_id: -1}).populate('writer').limit(pageSize*1).skip((page-1)*pageSize);
    res.json({total,docs});
    }catch(err){
        console.log(err);
        res.send();
    }
};

exports.mine_get =function(req,res){
    let id = req.session.userinfo.userid;
    Dynamic.find({writer:id},(err,docs)=>{
        if(err){
            console.log(err);
            res.send();
        }
        res.json(docs);
    });
};

exports.put =function(req,res){
    // console.log(req.body);
    let content = req.body.content;
    let addTime = req.body.addTime;
    let id = req.body.id;
    if (!content) {
        res.end()
    }
    else{
        Dynamic.findById({_id:id},(err,docs)=>{
            if(err){
                console.log(err)
            }
            docs.content=content;
            docs.addtime=addTime;
            docs.save((err)=>{
                if(err){
                    console.log(err);
                }else{
                    res.json({msg:'修改成功'})
                }
            })
        })
    }
}

exports.delete = function(req,res){
    console.log(req.body);
    let _id = req.body.id
    Dynamic.findById({_id},function(err,doc){
        if(err){
            console.log(err);
            return
        }
        console.log(doc);
        if(doc){
            doc.remove((err)=>{
                if(err){
                    console.log('delete err',err);
                }else{
                    res.json({msg:'删除成功'})
                }
            })
        }
    })
}