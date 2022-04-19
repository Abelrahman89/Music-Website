const express=require('express');
const playListController=require('../controller/playListController');
const router=express.Router();

router.get('/:userId', playListController.getPlayListByUserId);

router.get('/:userId/:songId/', playListController.getByUserIdSongId);
router.get('/', playListController.getPlayLists);

router.post('/', playListController.save);
router.delete('/:userId/:songId/', playListController.delete);







module.exports = router;