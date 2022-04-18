const express=require('express');
const songController=require('../controller/songController');
const router=express.Router();
router.get('/', songController.getSongs);
router.get('/song?', songController.getSongByQuery);
//router.get('/:songId', bookController.getbookById);








module.exports = router;