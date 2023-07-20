
const bodyParser = require('body-parser');
const userdb = require('../model/model');

// save new user and create

exports.create=(request,response)=>{

    // validate request
    if (!request.body) {
        response.status(400).send({message:"content can not be empty!"})
    }

//  new user 
    const user= new userdb({
            name:request.body.name,
            email:request.body.email,
            gender:request.body.gender,
     } )
    //  save user in the data base here save user in to user variable
     user.save(user).then(data=>{
      
      response.send(data)

     }).catch(err=>{
         response.status(500).send({
            message:err.message||"some error occured while creating a create operation"
         })
     })

//  console.log(request.body.name,request.body.email);
// response.send(request.body)
}

// retrieve and return all users/ retrive and return a single user

exports.find=(request,response)=>{
  
    // if there have a specific id we need to check it 
    if (request.query.id) {
        const id= request.query.id;

        userdb.findById(id)
        .then(data=>{
            // if there is no data 
            if (!data) {
                response.status(404).send({message:"not found user with id"+id})
            }else{
                // if there is data
            response.send(data)
            }
        })
        .catch(err=>{
            response.status(500).send({message:err.message||"error occurred while retriving user information"})
        })
    }else{
        userdb.find()
        .then(user=>{
            response.send(user)
        })
        .catch(err=>{
            response.status(500).send({message:err.message||"error Occurred while retriving user unformation"})
        }) 
    }
   

}

// update a new identified user by user id 

exports.update=(request,response)=>{

    // if (!request.body) {
    //     response.status(400).send({message:"data to update can not be empty"})
        
    // }
    const id = request.body.id
    console.log(id);
    userdb.updateOne({_id:id},{$set:{
        name:request.body.name,email:request.body.email 
    }}).then(d=>{
        response.send(d)
    })
    // userdb.findByIdAndUpdate(id.request.body,{useFindModify:false})
    // .then(data=>{
    //     if (!data) {
    //         response.status(404).send({message:`cannot Update user with ${id}.maybe user not found!`})
    //     }else{
    //         response.send(data)
    //     }
    // }).catch(err=>{
    //     response.status(500).send({message:"error update user information"})
    // })
}

// delete a useer with specified user id in the request
exports.delete=(request,response)=>{

    const id = request.params.id
    console.log(id);
    userdb.deleteOne({_id:id}).then(d=>{
        response.send(d)
    }).catch(kuj=>{
        response.send(kuj)
    })

    // userdb.findByIdAndDelete(id)
    // .then(data=>{
    //     if (!data) {
    //         response.status(404).send({message:`cannot delete with id ${id}.maybe id is wrong`})
    //     }else{
    //         response.send({
    //             message:"user was deleted succesfully!"
    //         })
    //     }
    // })
    // .catch(err=>{
    //     response.status(500).send({
    //         message:"could not delete user with id"+id
    //     })
    // })
}