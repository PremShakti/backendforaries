const express = require("express");
require("dotenv").config();
const { mainrouter } = require("./Routes/Routes");
const { connect } = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
let app = express();
let PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mogoURL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use("/", mainrouter);

app.all("*", (req, res) => {
  res.json({ "every thing": "is awesome" });
});

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});

// app.listen(PORT, async()=>{
//     try {

//         console.log(`your port is running in ${PORT}`)
//     } catch (error) {
//         console.log(error)
//     }
// })
