// Development (localhost) Server
const express = require('express');
// const path = require('path');
 
const app = express();

// NOTE: This type of property would be stored in a `.env` file. For brevity...
const PORT = process.env.PORT || 3030;

// NOTE: The average API is likely to have multiple resources, leveraging `express.Router()` for each resource CRUD methods...
// >>-> For this exercise I chose to serve up a static page
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  console.log(`%cEntry Point |>`, `background: light-grey; color: green;`);
  res.send('Home Page - Provided by express...');
})

app.listen(PORT, () => {
  console.log(`%cAd-Hoc "Fetch" exercise listening at http://localhost:${PORT}`, `background: light-grey; color: green;`);
})
