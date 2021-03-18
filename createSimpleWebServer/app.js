const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;


app.get('/test/:sub', (req, res) => {
  console.log(req.params);
  const { sub } = req.params;
  res.send(`hello ${sub}`)
});


app.get('/search', (req, res) => {
  console.log(req.query);
  res.send('Hi');
});




app.listen(PORT, () => console.log(`listening on port ${PORT} ....`));
