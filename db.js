const mongoose=require('mongoose')
require('dotenv').config()
const mogoURL=process.env.mogoURL
let connect=mongoose.connect("mongodb+srv://prem:shakti@cluster0.79txyol.mongodb.net/ariessmartsalon?retryWrites=true&w=majority")

module.exports={
    connect
}