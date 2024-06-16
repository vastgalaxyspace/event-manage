const mongoose =require("mongoose");
const Schema= mongoose.Schema;
const userschema= new Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }



},{timestamp:true});
module.exports=mongoose.model('User',userschema);
