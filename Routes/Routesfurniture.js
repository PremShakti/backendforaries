const express = require("express");
const { ProductsModel } = require("../module");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MongoClient, ObjectId } = require('mongodb');

require("dotenv").config();


const furnitureRoute = express.Router();

furnitureRoute.post("/additem", async (req, res) => {
  // await connectToDatabase();
  try {
    let newpost = new ProductsModel(req.body);
    await newpost.save();
    res.status(200).json({ message: "post succesfully posted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = {
    furnitureRoute,
  };