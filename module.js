const mongoose=require('mongoose')


const PostSchema=mongoose.Schema({
    url: String,
    date:Number,
    categary:String,

})
const userSchema=mongoose.Schema({
    user: String,
    pass:String,

})
const userReviewSchema=mongoose.Schema({
    name: String,
    review:String,

})

const services=mongoose.Schema({
    name: String,
    categary:String,
    price:Number,

})





const PostModel=mongoose.model("post",PostSchema)
const PostReview=mongoose.model("review",userReviewSchema)
const UserModel=mongoose.model("user",userSchema)
const ServicesModel=mongoose.model("services",services)


module.exports={
   
    PostModel,
    UserModel,
    ServicesModel,
    PostReview
}


