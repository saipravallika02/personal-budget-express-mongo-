const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use("/", express.static("public"));

const mongoose = require('mongoose');
const Budget =  require('./models/budgetschema')
let url = 'mongodb://127.0.0.1:27017/testing-db';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    () => (
        console.log("Connected")
    )
).catch(
    (connectionError) => console.log("Error while connecting to db", connectionError)
    );

app.get("/hello", (req, res) => {
  res.send("Hello World from Devaki Tella!");
});

app.get("/budget", (req, res) => {
  Budget.find({}, (err, data) => {
    if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Error querying the database' });
    } else {
        res.json(data);
    }
  });
});

app.get("/example", (req, res) => {
  Budget.find({}, (err, data) => {
    if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Error querying the database' });
    } else {
        res.json(data);
    }
  });
});

app.use(express.json());       
app.use(express.urlencoded());

app.post('/addBudgetItem', (req, res) => {

  console.log(req.body)
  const { title, budget, color } = req.body;
  const newBudgetItem = new Budget({
      title,
      budget,
      color,
  });

  // Save the new item to the database
  newBudgetItem.save((err, savedItem) => {
      if (err) {
          console.error('Error saving budget item:', err);
          res.status(500).json({ error: 'Error saving budget item' });
      } else {
          console.log('Budget item saved:', savedItem);
          res.status(201).json({"success": "true","data": savedItem}); // Respond with the saved item
      }
  });
});

app.listen(port, () => {
  console.log(`I am Serving at http://localhost:${port}`);
});
