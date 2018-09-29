const bodyParser = require('body-parser');
const express = require("express");
const cors = require('cors');

// initialize server
const server = express();

// parse JSON bodies
server.use(bodyParser.json());

// use CORS for access-control-header
server.use(cors());

// storage unit for each.
const tasks = [];

server.get("/", (req, res) => {
  res.json(tasks);
});

server.post("/", (req, res) => {
  const {name, age, hobby} = req.body;
  const newTask = {name, age, hobby};
  if(!newTask || !newTask.name || !newTask.age || !newTask.hobby) {
    res.status(422);
    res.json({error: "Must provide a complete user object with name, age, and hobby! Please review your entry."});
    return;
  }
  
  tasks.push(newTask);
  res.json(tasks);
  console.log(req.body);
});

server.listen(5000, () => console.log("working"));