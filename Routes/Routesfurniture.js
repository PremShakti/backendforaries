const express = require("express");
const { ProductsModel } = require("../module");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const furnitureRoute = express.Router();

furnitureRoute.post("/additem", async (req, res) => {
  // await connectToDatabase();

  let data = req.body;
  if (data) {
    try {
      let newpost = new ProductsModel(req.body);

      await newpost.save();
      res.status(200).json({ message: "post succesfully posted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    console.log("empty data");
  }
});

// products?sort=rating&order=asc

furnitureRoute.get("/getitem", async (req, res) => {
  var Id = req.query.id;
  const page = parseInt(req.query.page) || 1;
  let order = {};
  const limit = req.query.limit;
  const skip = (page - 1) * limit;

  

  if(Id){

    try {
      let getData = await ProductsModel.find({_id:Id})

      res.status(200).json(getData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }else{
    let query = {};
  
      if (req.query.categary) {
        query.categary = req.query.categary;
      }
  
      if (req.query.id) {
        req._id = req.query.id;
      }
      if (req.query.order) {
        order.price = parseInt(req.query.order);
      }
    try {
      
  
      const items = await ProductsModel.find(query)
        .sort(req.query.order || {})
        .sort(order)
        .skip(skip)
        .limit(limit);
  
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

furnitureRoute.delete("/delete/:id", async (req, res) => {
  const taskId = req.params.id;
  console.log(taskId);
  try {
    // Find and remove the task from the database
    const deletedTask = await ProductsModel.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

furnitureRoute.delete("/delete-all", async (req, res) => {
  try {
    await ProductsModel.deleteMany({});
    res.status(200).json({ message: "All data deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  furnitureRoute,
};
