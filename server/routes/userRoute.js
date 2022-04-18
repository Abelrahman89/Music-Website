const express=require('express');
const userController=require('../controller/userController');
const router=express.Router();

router.get('/?', userController.getByUserName);
//router.get('/:songId', bookController.getbookById);
router.put('/', userController.update);







module.exports = router;