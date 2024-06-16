const Event=require('../model/event.model');
const express=require('express');


const eventcontroller={};

eventcontroller.createevent= async(req,res,next)=>{
    const {title,description,date}=req.body;
  try{  const event=new Event({
        title,
        description,
        date,
        createdby:req.user_id
    });

    const createevent=await event.save();
    res.status(201).json(createevent);
}catch(err){
    return res.status(404).json({message:"server error"});
}};

eventcontroller.updateevent=async(req,res,next)=>{
    const { title, description, date } = req.body;

    try{
        const event=await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({message:"Event is not found"});
        }
        if(event.createdby.toString!=event.user_id.toString){
            return res.status(401).json({message:"user is not authorized"});
        }
        event.title=title;
        event.description=description;
        event.date=date;
        const updateevent=await event.save();
        res.status(200).json(updateevent);


    }catch(err){
        return res.status(404).json({message:"server error"});

    }

}

module.exports=eventcontroller;