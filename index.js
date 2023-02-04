const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World Test!');
})

app.get('/info', (req, res) => {
    res.send('Site Info');
  })

  app.get('/contact', (req, res) => {
    res.send('Contact Me');
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});