const express = require("express");
const { TodoModelforMongodb } = require("../module");


const todos=express.Router();


todos.post('/items', async (req, res) => {
    try {
      const newItem = new TodoModelforMongodb(req.body);
      const savedItem = await newItem.save();
      res.json(savedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Read (all items)
  todos.get('/items', async (req, res) => {
    try {
      const items = await TodoModelforMongodb.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Read (single item)
  todos.get('/items/:id', async (req, res) => {
    try {
      const item = await TodoModelforMongodb.findById(req.params.id);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update
  todos.put('/items/:id', async (req, res) => {
    try {
      const updatedItem = await TodoModelforMongodb.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete
  todos.post('/deleteitems', async (req, res) => {
    
    try {
      const itemIds = req.body.itemIds;
  
      if (!itemIds || !Array.isArray(itemIds)) {
        return res.status(400).json({ error: 'Invalid itemIds format' });
      }
  
      // Delete items by their IDs
      const result = await TodoModelforMongodb.deleteMany({ _id: { $in: itemIds } });
  
      res.status(200).json({ message: 'delete success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




module.exports={
    todos,
}