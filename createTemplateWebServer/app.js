const express = require('express');
const path = require('path');
app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/',(req, res) => {
  res.render('home');
});

app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render('random', { rand: num});
});

app.get('/dogs', (req, res) => {
  dogs = [ 'fred', 'rebel', 'spike', 'archie', 'sadie'];
  res.render('dogs', {dogs});
})



app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


