const mongoose=require('mongoose')

async function dbConnection(){
    let connection=await mongoose.connect('mongodb://127.0.0.1:27017/studentdetails')
    console.log('mongodb connected');
    
}

module.exports=dbConnection