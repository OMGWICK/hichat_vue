var express = require('express');
var router = express.Router();
var commentController=require('../controllers/commentController')


router.get('/',commentController.get);
router.post('/',commentController.post);
router.delete('/',commentController.delete);

module.exports = router;