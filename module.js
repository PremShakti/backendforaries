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

const PostItem=mongoose.Schema({
    name:String,
    url:String,
    rating:Number,
    price:Number,
    categary:String,

})

const TodoSchemaforMongodb=mongoose.Schema({
    todo:String,
    date:String
})





const PostModel=mongoose.model("post",PostSchema)
const ProductsModel=mongoose.model("products",PostItem)
const PostReview=mongoose.model("review",userReviewSchema)
const UserModel=mongoose.model("user",userSchema)
const ServicesModel=mongoose.model("services",services)
const TodoModelforMongodb=mongoose.model("todosListMdb",TodoSchemaforMongodb)

module.exports={
   
    PostModel,
    UserModel,
    ServicesModel,
    PostReview,
    ProductsModel,
    TodoModelforMongodb
}


