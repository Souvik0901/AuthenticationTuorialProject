
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')


const profileRoutes = require('./routes/profiles')
const userRoutes = require('./routes/user')


//express app
const app = express()

//middleware
app.use(express.json())

app.use((req,res,next)=>{
  console.log(req.path,req.method)
  next()
})

//routes
 app.use('/api/profiles',profileRoutes)
 app.use('/api/user', userRoutes)

//connected to db
mongoose.connect(process.env.MONGO_URI)
        .then(()=>{

            console.log('connected to database') 

            //listen for requests
            app.listen(process.env.PORT,()=>{
              console.log('listning on port',process.env.PORT)
            })
        })
        .catch((error)=>{
          console.log(error)
        })




