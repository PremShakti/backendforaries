// const express = require("express");

// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();

// const todolist = express.Router();

// const bodyParser = require("body-parser");
// const mysql = require("mysql");

// // Parse incoming requests with JSON payloads
// todolist.use(bodyParser.json());

// // Create MySQL connection
// const db = mysql.createPool({
//   host: "sql12.freesqldatabase.com",
//   user: "sql12673698",
//   password: "yQSx4ec12i",
//   database: "sql12673698",
//   connectTimeout: 30000,
// });

// // Connect to MySQL
// db.getConnection((err, connection) => {
//   if (err) {
//     console.error("Error connecting to MySQL: " + err.stack);
//   } else if (connection) {
//     todolist.post("/data", (req, res) => {
//       const { todo } = req.body;
//       const id = uuidv4();
//       const date = new Date();
//       const insertQuery = "INSERT INTO todolist (todo,date,id) VALUES (?, ?,?)";
//       db.query(insertQuery, [todo, date, id], (err, result) => {
//         if (err) throw err;
//         res
//           .status(201)
//           .json({
//             message: "User created successfully",
//             userId: result.insertId,
//           });
//       });
//     });

//     // Read all users
//     todolist.get("/data", (req, res) => {
//       const query = "SELECT * FROM todolist";

//       // Execute the SQL query
//       db.query(query, (error, results) => {
//         if (error) {
//           console.error("Error executing query:", error);
//           res.status(500).json({ error: "Error fetching data from database" });
//           return;
//         }

//         res.json(results);
//       });
//     });

//     // Read a user by ID
//     todolist.get("/users/:id", (req, res) => {
//       const userId = req.params.id;
//       const selectQuery = "SELECT * FROM users WHERE id = ?";
//       db.query(selectQuery, [userId], (err, result) => {
//         if (err) throw err;
//         if (result.length === 0) {
//           res.status(404).json({ message: "User not found" });
//         } else {
//           res.json(result[0]);
//         }
//       });
//     });

//     // Update a user by ID
//     todolist.put("/users/:id", (req, res) => {
//       const userId = req.params.id;
//       const { name, email } = req.body;
//       const updateQuery = "UPDATE users SET name = ?, email = ? WHERE id = ?";
//       db.query(updateQuery, [name, email, userId], (err, result) => {
//         if (err) throw err;
//         if (result.affectedRows === 0) {
//           res.status(404).json({ message: "User not found" });
//         } else {
//           res.json({ message: "User updated successfully" });
//         }
//       });
//     });

//     // Delete a user by ID
//     todolist.delete("/data/:id", (req, res) => {
//       const userId = req.params.id;
//       const deleteQuery = "DELETE FROM todolist WHERE id = ?";
//       db.query(deleteQuery, [userId], (err, result) => {
//         if (err) throw err;
//         if (result.affectedRows === 0) {
//           res.status(404).json({ message: "User not found" });
//         } else {
//           res.json({ message: "User deleted successfully" });
//         }
//       });
//     });

//     console.log("Connected to MySQL as id " + db.threadId);
//   }
// });

// module.exports = {
//   todolist,
// };
