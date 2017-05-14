const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
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
  //var foo = new Location({
  //  name: "Fuck off",
  //  address: "840 River Rd, Edgewater NJ",
  //  accessibleFriendly: false,
  //  reason: "No clue"
  //})

  //var bar = new Location({
  //  name: "Fuck off",
  //  address: "840 River Rd, Edgewater NJ",
  //  accessibleFriendly: false,
  //  reason: "No clue"
  //})

  //Location.insertMany([foo, bar], (res) => {
  //  console.log(res)
  //})

});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('home', {foo: 'Hi'});
});

app.get('/location/:address', (req, res) => {
  const address = req.params.address;
  console.log('address', address)

  Location.findOne({ 'address': address }, (err, data) => {
    if (err) return handleError(err);
    res.render('map', data);
  })
})

app.get('/form', (req, res) => {
  res.render('form')
})

app.get('/map', (req, res) => {
  res.render('map')
})

app.use('/sms', sms);

app.listen(PORT, () => {
    console.log(PORT)
});
