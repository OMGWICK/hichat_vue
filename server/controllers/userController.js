const Password = require('../models/password')
const User = require('../models/users')

let apiTools = {};
apiTools.getSuRtnData = function (data) {
    return {
        resultCode: 1,
        data: data
    }
};
apiTools.getFailRtnData = function (errorCode, msg) {
    return {
        resultCode: 0,
        errorCode: errorCode,
        msg: msg,
    }
};
const ERROR_CODE = {
    login_error_1: {
        code: '1001',
        msg: '用户名或密码错误！'
    },
    login_error_2: {
        code: '1002',
        msg: '用户名已存在',
    },
    login_error_3: {
        code: '1003',
        msg: '注册失败',
    },
    login_error_5: {
        code: '1003',
        msg: '注销失败！'
    }
}


exports.login_post = function (req, res) {
    console.log('123')
    let username = req.body.userName;
    let password = req.body.passWord;
    Password.find({username,password},(err,docs)=>{
        if(docs.length!=0){
            req.session.regenerate((err) => {
                if (err) {
                    res.json(apiTools.getFailRtnData(ERROR_CODE.login_error_1.code, ERROR_CODE.login_error_1.msg));
                }
                req.session.userinfo = {};
                let userinfo = req.session.userinfo;
                userinfo.username = username;
                User.findOne({
                    username
                }, (err, docs) => {
                    // console.log(docs)
                    userinfo.userid = docs._id;
                    // console.log(req.session);
                    res.send(apiTools.getSuRtnData(userinfo.userid));
                })
            })
        }else{
        res.json(apiTools.getFailRtnData(ERROR_CODE.login_error_1.code, ERROR_CODE.login_error_1.msg));
        }
    })
}

exports.register_post = function (req, res) {
    // console.log(req.body);
    let username = req.body.name;
    let password = req.body.pass;
    Password.find({
        username
    }, (err, docs) => {
        // console.log(docs);
        if (docs.length != 0) {
            // console.log('123');
            res.send(apiTools.getFailRtnData(ERROR_CODE.login_error_2));
        }else{
            let psw = new Password({
                username,
                password,
            });
            psw.save((err) => {
                if (err) {
                    console.log(err)
                }
            });
            let user = new User({
                username,
            })
            user.save((err) => {
                if(err){
                console.log(err)
                }
            })
            req.session.regenerate((err) => {
                if (err) {
                    res.json(apiTools.getFailRtnData(ERROR_CODE.login_error_3.code, ERROR_CODE.login_error_3.msg));
                }
                req.session.userinfo = {};
                let userinfo = req.session.userinfo;
                userinfo.username = username;
                User.findOne({
                    username
                }, (err, docs) => {
                    if (err) {
                        console.log(err)
                    }
                    // console.log(docs);
                    userinfo.userid = docs._id;
                    // console.log(req.session);
                    res.send(apiTools.getSuRtnData(userinfo.userid));
                })
            })
        }
    });
    
}

exports.logout_post = function(req,res){
    console.log("session.username:" + req.session.userinfo.username);
    req.session.destroy(function (err) {
      if (err) {
        res.json(apiTools.getFailRtnData(ERROR_CODE.login_error_5.code, ERROR_CODE.login_error_5.msg));
        return;
      }
      // req.session.loginUser = null;
      res.clearCookie('hichatkey');
      res.send(apiTools.getSuRtnData(''));
    });
}