// here we are require mongoose 
const mongoose=require('mongoose')

const User=mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    // gender:String,
    
})

const userdb=mongoose.model('usersdb',User)
module.exports=userdb