const express= require('express');
const morgan=require('morgan')
const bodyparser=require('body-parser')
const path=require('path')
const dbConnection=require('./backend/mongodb_connection/connection')
const app= express()
const controller = require('./backend/controller/controller')
const axios=require('axios')

dbConnection()

app.use(morgan('tiny'))
//parse request to body-parser
// app.use(bodyparser())
app.use(bodyparser.urlencoded({extended:true}))

//set view engine here were using ejs 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

app.get('/',(request,response)=>{
    
    response.render('user-login')

})
app.post('/login',(request,response)=>{
    response.render('homepage',{products})
})


app.get('/admin',(request,respond)=>{
    axios.get("http://localhost:7000/add-user")
    .then(function(res){
        // console.log(res);
        respond.render('show',{user:res.data});
    })
     
})
// .cach(err=>{
//   respond.send(err)  
// })

app.post('/add-user',controller.create)
app.get('/add-user',controller.find)
app.post('/update-user',controller.update)
app.get('/delete/:id',controller.delete)

app.get('/new-form',(request,response)=>{
    response.render('add-user')
})
app.get('/update-user',(request,response)=>{

    axios.get("http://localhost:7000/add-user",{params:{id:request.query.id}})
    .then(function(userdata){
       
        response.render("update_user",{user:userdata.data})
        console.log(user);
    })
    // response.render('update_user')
})

// app.get('/delete-user',(request,response)=>{
//     // here we are passing the url of the user we are choosened in the table
//     axios.get("http://localhost:7000/delete-user",{params:{id:request.query.id}})
//     .then(function(user){
//         console.log();
//         response.redirect("show",{user:user.data})
//     })
//     // response.render('update_user')
// })
let products=[
    {
     name:" converse",
     category:" chucktylor",
     discription:" from vietnam, new chuck from converse",
     Image :"https://media.gq-magazine.co.uk/photos/623b39232048d5d3dc2bbb90/master/w_1600%2Cc_limit/230322_Converse_02.jpg"
    },
    {
      name:" converse",
      category:" sneakers",
      discription:" from japan,new products from convers for streets",
      Image :"https://media.gq-magazine.co.uk/photos/623b39232048d5d3dc2bbb90/master/w_1600%2Cc_limit/230322_Converse_02.jpg"
     },
     {
      name:"converse",
      category:" sneakers",
      discription:"from india, NBA based shoes comfortabel for streets",
      Image :"https://media.gq.com/photos/6238e07b6452c9a0fe1848e3/master/w_2000,h_1333,c_limit/converse-update-4.jpg"
     },
     {
      name:"converse",
      category:" chuck tylor",
      discription:"made from uk, chuk taylors make yor outfits awsome",
      Image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmi37kanMqzHCCpE6tpwRIAkLUsMr-HbpwJEDg6BApokKFd67EfjT7zSu0kuGg4zpCr4&usqp=CAU"
     },
     {
      name:" converse",
      category:" chucktylor",
      discription:" from vietnam, new chuck from converse",
      Image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmi37kanMqzHCCpE6tpwRIAkLUsMr-HbpwJEDg6BApokKFd67EfjT7zSu0kuGg4zpCr4&usqp=CAU"
     },
     {
       name:" converse",
       category:" sneakers",
       discription:" from japan,new products from convers for streets",
       Image :"https://media.gq-magazine.co.uk/photos/623b39232048d5d3dc2bbb90/master/w_1600%2Cc_limit/230322_Converse_02.jpg"
      },
      {
       name:"converse",
       category:" sneakers",
       discription:"from india, NBA based shoes comfortabel for streets",
       Image :"https://media.gq.com/photos/6238e07b6452c9a0fe1848e3/master/w_2000,h_1333,c_limit/converse-update-4.jpg"
      },
      {
       name:"converse",
       category:" chuck tylor",
       discription:"made from uk, chuk taylors make yor outfits awsome",
       Image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmi37kanMqzHCCpE6tpwRIAkLUsMr-HbpwJEDg6BApokKFd67EfjT7zSu0kuGg4zpCr4&usqp=CAU"
      },
  ]

app.listen(7000,()=>{console.log(`server is running on localhost http://localhost:${7000}`)})