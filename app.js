// Development (localhost) Server
const express = require('express');
const app = express();
const port = 3030;

// Routes
app.get('/', (req, res) => {
  console.log(res.send('index.js loaded'))
})

app.listen(3030, (port, () => {
  console.log(`Ad-Hoc "Fetch" exercise listening at http://localhost:${port}`)
}))
