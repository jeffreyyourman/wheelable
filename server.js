const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.render('home', {foo: 'Hi'});
});

app.get('/form', (req, res) => {
  res.render('form')
})


app.listen(PORT);
