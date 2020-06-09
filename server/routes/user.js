var express = require('express');
var router = express.Router();
const userController=require("../controllers/userController");

/* GET users listing. */
router.post('/login',userController.login_post);

router.post('/register',userController.register_post);

router.post('/logout',userController.logout_post);

module.exports = router;
