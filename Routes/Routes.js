const express = require("express");
const { PostModel, UserModel, PostReview, ServicesModel } = require("../module");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/Auth");

require("dotenv").config();
const mainrouter = express.Router();

mainrouter.post("/addgallery",auth, async (req, res) => {
  try {
    let newpost = new PostModel(req.body);
    await newpost.save();
    res.status(200).json({ message: "post succesfully posted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// .sort({no_of_comments:1})

mainrouter.get("/getgallery", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  try {
    let getData = await PostModel.find()
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(getData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

mainrouter.get("/getgallerybannerslider", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const categary = req.query.categary;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  try {
    let getData = await PostModel.find({ categary: categary })
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(getData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

mainrouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await PostModel.findByIdAndUpdate(
      { _id: id },
      { categary: req.body.categary }
    );
    // await PostModel.find

    res.status(200).json({ message: "update succsesfull" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

mainrouter.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    await PostModel.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: "delete successfullll" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

mainrouter.post("/register", async (req, res) => {
  const { user, pass } = req.body;

  try {
    const useralreadythere = await UserModel.findOne({ user });
    if (useralreadythere) {
      res.json({ message: "user have alredy registred" });
    } else {
      bcrypt.hash(pass, 5, async (err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          let User = new UserModel({ user, pass: result });
          await User.save();
          res.status(200).json({ message: "register successful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

mainrouter.post("/login", async (req, res) => {
  const { user, pass } = req.body;
  try {
    let authUser = await UserModel.findOne({ user });

    if (!authUser) {
      res.status(400).json({ message: "user is not exist" });
    } else {
      bcrypt.compare(pass, authUser.pass, async (err, result) => {
        if (err) {
          res.status(400).json({ message: "password is incorect" });
        } else {
          let token = jwt.sign({ userID: authUser._id }, "masai");
          
          res.cookie('authToken', token, { httpOnly: true });
          

          res.status(200).json({ message: "Login successful", token: token });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

mainrouter.post("/postreview", async (req, res) => {
  try {
    let reviewData = new PostReview(req.body);
    await reviewData.save();

    res.status(200).json(reviewData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

mainrouter.get("/getreview", async (req, res) => {
    try {
      let reviewData = await PostReview.find();
      
  
      res.status(200).json(reviewData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  mainrouter.delete("/getreviewdelete/:id", async (req, res) => {

     const { id } = req.params;

  try {
    await PostReview.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: "delete successfullll" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  });


  mainrouter.get("/services", async (req, res) => {
    try {
      let servicesData = await ServicesModel.find();
      
  
      res.status(200).json(servicesData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  mainrouter.delete("/services/:id", async (req, res) => {

    const { id } = req.params;

 try {
   await ServicesModel.findByIdAndDelete({ _id: id });

   res.status(200).json({ message: "delete successfullll" });
 } catch (error) {
   res.status(400).json({ message: error.message });
 }
 });

 mainrouter.post("/services", async (req, res) => {
  try {
    let servData = new ServicesModel(req.body);
    await servData.save();

    res.status(200).json(servData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = {
  mainrouter,
};
