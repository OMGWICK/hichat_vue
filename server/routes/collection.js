var express = require('express');
var router = express.Router();
var collectionController=require('../controllers/collectionController')

router.get('/',collectionController.get);

router.post('/',collectionController.post);

router.delete('/',collectionController.delete);

router.post('/status',collectionController.status_post);

module.exports = router;