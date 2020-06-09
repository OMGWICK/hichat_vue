var express = require('express');
var router = express.Router();
var likeController=require('../controllers/likeController')

router.get('/',likeController.get);

router.post('/',likeController.post);

router.post('/status',likeController.status_post);

router.delete('/',likeController.delete);

module.exports = router;