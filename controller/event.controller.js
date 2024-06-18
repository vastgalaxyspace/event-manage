const e = require('express');
const Event=require('../model/event.model');
const User=require('../model/user.model');
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
eventcontroller.getevent=async(req,res,next)=>{
    const event=await Event.findById(req.params.id).populate('createdby','username email').populate('attendence','username email');
    if(event){
        res.json(event);
    }else{
        res.status(404).json({message:"error occur"});
    }
}

eventcontroller.registerevent=async(req,res)=>{
    const {email}=req.body;
    const {eventid}=req.params;

  try{
    const user= await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    const event=await Event.findById(eventid);  
    if(!event){
        return res.status(404).json({message:"Event does not occur"});
    }

    if(event.attendence.includes(user._id)){
        return res.status(400).json({message:"user already registered"});
    }

    event.attendence.push(user._id);
    await event.save();

    res.status(200).json({message:"user registered successfully"});

  }catch(error){
    return res.status(404).json({message:"server error"});
  }
}

eventcontroller.deleteevent=async(req,res)=>{
    const {id}=req.params;
    try{
        const event=await Event.findByIdAndDelete(id);
        if(!event){
            return res.status(400).json({message:"event not found"});
        }
        res.status(200).json({message:"event deleted sucessfully"});

    }catch(error){
        return res.status(400).json({message:"server error"});

    }
}


module.exports=eventcontroller;