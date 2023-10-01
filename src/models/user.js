const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        required:true
    },
    fullName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    // bio:String, // we can define like this also ,if we dont want to declare default,required etc.,
    bio:{
        type:String,
        default:null
    },
    links: {
        type:Array,
        default:[]
    },
    isDeleted: {
        type:Boolean,
        default:false
    },
    fcmToken:{
        type:String,
        default:null
    },
    deviceType:{
        type:String,
        default:null
    },
    token:{
        type:String,
        default:null
    }
});

// const User = mongoose.model('User', userSchema); or use the below one

module.exports=mongoose.model("User",userSchema)
