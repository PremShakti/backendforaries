const mongoose=require('mongoose')
require('dotenv').config()
// const mogoURL=process.env.mogoURL
let connect=mongoose.connect(mongoose)

module.exports={
    connect
}