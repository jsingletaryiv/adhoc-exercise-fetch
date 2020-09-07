// Development (localhost) Server
const express = require('express');
const app = express();

// NOTE: Again, this type of property would be stored in a `.config` or `.env` file. For brevity...
const PORT = process.env.PORT || 3030;

// TODO: Upon success response update actual API endpoint to use requested data
const tmpData = [
  { id: 1, color: "brown", disposition: "closed" },
  { id: 2, color: "yellow", disposition: "open" },
  { id: 3, color: "brown", disposition: "closed" },
  { id: 4, color: "brown", disposition: "open" },
  { id: 5, color: "red", disposition: "closed" },
  { id: 6, color: "blue", disposition: "open" },
  { id: 7, color: "green", disposition: "closed" },
  { id: 8, color: "green", disposition: "open" },
  { id: 9, color: "brown", disposition: "closed" },
  { id: 10, color: "red", disposition: "open" },
  { id: 11, color: "blue", disposition: "closed" },
  { id: 12, color: "yellow", disposition: "open" },
  { id: 13, color: "green", disposition: "open" },
  { id: 14, color: "yellow", disposition: "open" },
  { id: 15, color: "blue", disposition: "closed" },
  { id: 16, color: "blue", disposition: "closed" },
  { id: 17, color: "blue", disposition: "closed" },
  { id: 18, color: "green", disposition: "open" },
  { id: 19, color: "yellow", disposition: "open" },
  { id: 20, color: "brown", disposition: "closed" },
  { id: 21, color: "green", disposition: "closed" },
  { id: 22, color: "red", disposition: "closed" },
  { id: 23, color: "red", disposition: "open" },
  { id: 24, color: "red", disposition: "open" },
  { id: 25, color: "red", disposition: "open" },
  { id: 26, color: "red", disposition: "closed" },
  { id: 27, color: "brown", disposition: "closed" },
  { id: 28, color: "blue", disposition: "open" },
  { id: 29, color: "brown", disposition: "closed" },
  { id: 30, color: "blue", disposition: "closed" },
  { id: 31, color: "red", disposition: "open" },
  { id: 32, color: "blue", disposition: "open" },
  { id: 33, color: "yellow", disposition: "open" },
  { id: 34, color: "red", disposition: "open" },
  { id: 35, color: "blue", disposition: "open" },
  { id: 36, color: "green", disposition: "closed" },
  { id: 37, color: "green", disposition: "open" },
  { id: 38, color: "blue", disposition: "open" },
  { id: 39, color: "green", disposition: "closed" },
  { id: 40, color: "red", disposition: "closed" },
  { id: 41, color: "brown", disposition: "open" },
  { id: 42, color: "brown", disposition: "closed" },
  { id: 43, color: "green", disposition: "closed" },
  { id: 44, color: "blue", disposition: "closed" },
  { id: 45, color: "blue", disposition: "closed" },
  { id: 46, color: "yellow", disposition: "closed" },
  { id: 47, color: "green", disposition: "open" },
  { id: 48, color: "red", disposition: "closed" },
  { id: 49, color: "blue", disposition: "closed" },
  { id: 50, color: "blue", disposition: "open" }
]

// Define Headers
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Define Routes
app.get('/', (req, res) => res.send('index.js loaded via express route'));

app.get('/records', paginateResults(tmpData), (req, res) => {
  // console.log('Paginated Data: ', res.paginatedResults);
  res.json(res.paginatedResults);
})

// Middleware Helper Function  
function paginateResults(model) { // <- Wrapper function
  return (req, res, next) => {    // <- Returns actual middleware
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
  
    // Set Pagination Index Values
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    // Mutated Results Object
    const results = {};
  
    // Evaluate `nextPage` Properties
    if (endIndex < model.length) {
      results.nextPage = {
        page: page + 1,
        limit: limit
      }
    }
    // Evaluate `previousPage` Properties
    if (startIndex > 0) {
      results.previousPage = {
        page: page - 1,
        limit: limit
      }
    }
  
    // results.result = tmpData.slice(startIndex, endIndex);
    results.result = model.slice(startIndex, endIndex);
  
    //Store paginated results to the `response` object
    res.paginatedResults = results;
    next();
  }
}

app.listen(PORT, () => {
  console.log(`%cAd-Hoc "Fetch" exercise listening at http://localhost:${PORT}`, `background: light-grey; color: green;`);
})
