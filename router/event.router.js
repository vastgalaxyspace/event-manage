const eventcontroller=require('../controller/event.controller');
const express=require('express');
const router=express.Router();

router.route('/createevent').post(eventcontroller.createevent);
router.route('/update/:id').patch(eventcontroller.updateevent);
router.route('/delete/:id').delete(eventcontroller.deleteevent);
router.route('/getevent/:id').get(eventcontroller.getevent);
router.route('/registerevent/:id').post(eventcontroller.registerevent);

module.exports=router;