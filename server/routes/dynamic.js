var express = require('express');
var router = express.Router();
var dynamicController=require('../controllers/dynamicController')


router.get('/',dynamicController.get);

router.get('/mine',dynamicController.mine_get);

router.get('/page',dynamicController.page_get);

router.get('/hotlist',dynamicController.hotlist_get);

router.post('/',dynamicController.post);

router.put('/',dynamicController.put);

router.delete('/',dynamicController.delete);

module.exports = router;