const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  if(!req.body.username) return res.status(400).json({ message: "Invalid User Name"});

  if(!req.body.password) return res.status(400).json({ message: "Invalid Password"});

  const isExisting = users.filter(i => i.username == req.body.username);

  if(isExisting.length) {
    return res.status(400).json({ message: "Username Already Exists"});
  }

  users.push({ username: req.body.username, password: req.body.password});

  return res.status(200).json({message: "Customer Successfully Register. Now you can log in"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({ books });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(200).json(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = Object.keys(books).filter((key) => books[key]["author"] == req.params.author);
  return res.status(200).json({ booksByAuthor: author.map(i => books[i]) });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const titles = Object.keys(books).filter((key) => books[key]["title"] == req.params.title);
  return res.status(200).json({ booksByTitle: titles.map(i => books[i]) });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(200).json(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
