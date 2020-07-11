var express = require('express');
var router = express.Router();
var multer = require('multer');

const storage = multer.diskStorage({
    //创建路径相对于启动目录
    destination(req,file,cb){
        cb(null,'public/upload/')
    },
    filename(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
const upload = multer({storage});
router.post('/',upload.single('file'),(req,res)=>{
    // console.log('req.file')
    const url='http://localhost:3000/upload/'+req.file.filename;
    res.json({url})
})

module.exports = router;
