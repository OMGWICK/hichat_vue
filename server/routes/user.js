var express = require('express');
var router = express.Router();
const userController=require("../controllers/userController");


router.post('/login',userController.login_post);

router.post('/register',userController.register_post);

router.post('/logout',userController.logout_post);

router.post('/info',userController.userinfo_post);

router.get('/info',userController.userinfo_get);

router.post('/userurl',userController.userUrl_post);

module.exports = router;
