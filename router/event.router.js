const eventcontroller=require('../controller/event.controller');
const express=require('express');
const router=express.Router();

router.route('/createevent').post(eventcontroller.createevent);

module.exports=router;