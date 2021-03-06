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
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/location/:address', (req, res) => {
  const addressQuery = req.params.address.toLowerCase().trim();
  Location.findOne({ address: addressQuery }, (err, data) => {
    if (err) {
      console.log(err);
    }

    if (!data) {
      res.json(null)
    } else {
      res.json(data)
    }

    });
})

app.post('/companyInfo', (req, res) => {
  const resObj = req.body
  console.log(resObj)
  const newLocation = new Location(resObj)
  console.log(newLocation);
  newLocation.save( err => {
    if (err) {
      console.log(err);
    }
    console.log(`list saved!`)
    res.redirect('/map')
  })
})

app.get('/form', (req, res) => {
  res.render('form')
})

app.get('/formUpdate', (req, res) => {
  res.render('formUpdate')
})

app.get('/map', (req, res) => {
  res.render('map')
})

app.use('/sms', sms);

app.use('/*', (req, res) => {
  res.redirect('/map');
})

app.listen(PORT, () => {
    console.log(PORT)
});
