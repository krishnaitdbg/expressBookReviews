const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4)); 
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const authorName = req.params.author;
  let filtered_books = (Object.values(books)).filter((book) => book.author.toLowerCase() === authorName.toLowerCase());
  if (filtered_books.length > 0) {
    res.send(filtered_books);
  } else {
    res.send('No books found for this author ' + authorName);
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const titleName = req.params.title;
  let filtered_books = (Object.values(books)).filter((book) => book.title.toLowerCase() === titleName.toLowerCase());
  if (filtered_books.length > 0) {
    res.send(filtered_books);
  } else {
    res.send('No book(s) found by this title ' + titleName);
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (Object.values(books)[isbn]) {
    if (Object.values(books)[isbn].reviews.length > 0) {
        res.send(Object.values(books)[isbn].reviews);
    } else {
        res.send('No reviews found for this book ISBN');
    }
  } else {
    res.send('No book found by this book ISBN ' + req.params.isbn);
  }
  
});

module.exports.general = public_users;
