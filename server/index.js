require('dotenv').config()

const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const path = require('path')

const userRoutes = require('./routes/userRoutes')
const carRoutes = require('./routes/carRoutes')
const bookinRoutes = require('./routes/bookingRoutes')


const app = express()
app.use(express.json());

// routes
app.use('/api/users', userRoutes)
app.use('/api/cars', carRoutes)
app.use('/api/booking', bookinRoutes)

// static files
app.use(express.static(path.join(__dirname,'../client/build')))

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'../client/build'))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`.bgBlue)
})
