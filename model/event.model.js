const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const eventschema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true

    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    attendence:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    location:{
        type:String,
        required:true
    }
},{timestamps:true}
);

module.exports =mongoose.model('Event',eventschema);