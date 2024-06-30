const express = require('express');
const path = require('path'); // Import the Path module, which helps with handling file paths
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// Use body-parser to parse POST request data
app.use(bodyParser.urlencoded({ extended: true })); // this allows to read url encoded data, extended : true invokes the use of qs library and false invokes the use of querystring library.
//the difference being that qs can do all querystring can but can handle arrays, etc in the url encoded data like querystrings.
app.use(bodyParser.json());//when there is a json payload this can parse that and make it available for use in req.body.

let todoItems = [];

// GET route to render the index.ejs file
app.get('/', (req, res) => {
  res.render('index', { todoItems: todoItems });//over here it renders the index view assuming i have set up template engine like ejs and passes it the data, todoItem in this case
});

// POST route to add a new item
app.post('/add', (req, res) => {
  const newItem = req.body.todoItem; //this accesses the data sent in the body of the post request
  if (newItem.trim()) { // .trim() is a JavaScript string method that removes whitespace (spaces, tabs, newlines) from both ends of the string.
    todoItems.push(newItem);
  }
  res.redirect('/');//common practice to redirect back to get route to avoid resubmission od data and such issues
});

// POST route to remove an item
app.post('/remove', (req, res) => {
  const index = req.body.index;//this is also the same as getting the data from the body, but .index and .todoItem depends on what the attribute name suggests in the html
  if (index !== undefined && index >= 0 && index < todoItems.length) {//checks if index is defined, non-negative, and within the bounds of the todoItems array.
    todoItems.splice(index, 1); //Remove the item from the "todoItems" array if the condition is met
  }
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
