const express = require("express");
require("dotenv").config();
const { mainrouter } = require("./Routes/Routes");
const { connect } = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { furnitureRoute } = require("./Routes/Routesfurniture");
const { todolist } = require("./Routes/RouteTodolist");
const { todos } = require("./Routes/RouteTodolistmongodb");
let app = express();
let PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());






app.use("/", mainrouter);
app.use("/furniture", furnitureRoute);
// app.use("/todolist", todolist);
app.use("/todos",todos)


app.listen(PORT, async()=>{
    try {
        await connect
        console.log(`your port is running in ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})
