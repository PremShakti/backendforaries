const express=require('express')
require('dotenv').config()
const {mainrouter}=require('./Routes/Routes')
const {connect}=require('./db')
const cors=require('cors')
const cookieParser = require('cookie-parser');

let app=express()
let PORT=process.env.PORT
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use("/",mainrouter)


app.listen(PORT||8080, async()=>{
    try {
        await connect
        console.log(`your port is running in ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})