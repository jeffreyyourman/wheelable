const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const db = mongoose.connection;
const Location = require('./models/Location.js');
const User = require('./models/User.js');
const sms = require('./controller/sms');

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(`mongodb://localhost/wheelable`);
}

db.on("error", (error) => {
  console.log(`Mongoose Error: ${error}`);
});

db.once("open", () => {
  console.log(`Mongoose connection successful.`);
  //var foo = new User({name: "Craig"})
  //var bar = new User({name: "Jon"})
  //User.insertMany([foo, bar], (res) => {
  // console.log(res)
  //})
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.render('home', {foo: 'Hi'});
});

app.get('/form', (req, res) => {
  res.render('form')
})


app.use('/sms', sms);

app.listen(PORT, () => { 
    console.log(PORT)
});

