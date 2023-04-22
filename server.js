// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// Set up app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
//reference https://expressjs.com/en/starter/static-files.html
//https://www.geeksforgeeks.org/express-js-express-static-function/
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Set up database connection
//https://stackoverflow.com/questions/68234879/usenewurlparser-true-useunifiedtopology-true-what-is-the-use-of-this-in-mon
mongoose.connect('mongodb+srv://menstrual:i0r3D6rayayhy5bo@sei.3zeldhq.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

//reference: https://youtu.be/9OfL9H6AmhQ
const periodSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  flowLength: Number,
  notes: String,
  flowLevel: String,
  cramps: String,
  emotional: [String],
  //attempting to create it into an array because it has multiple options
  physical: [String],
  otherPhysical: String,
  discharge: String,
  temperature: Number,
});



// Create data model for period
const Period = mongoose.model('Period', periodSchema);

// Define home route
app.get('/', (req, res) => {
  res.render('home');
});

//-----------CRUD-------// CRUD ------------------------- // CRUD -----------------------------//
//-----------CRUD-------// CRUD ------------------------- // CRUD -----------------------------//
//-----------CRUD-------// CRUD ------------------------- // CRUD -----------------------------//

app.get('/periods', async (req, res) => {
  //create the periods const to make it easier to navigate
  const periods = await Period.find({});
  res.render('index', { periods });
});

//calling periods and new.ejs file
app.get('/periods/new', (req, res) => {
  res.render('new');
});

//calling periods and allows to POST new entries
app.post('/periods', async (req, res) => {
//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
  const period = new Period(req.body.period);
  await period.save();
  res.redirect('/periods');
});

app.get('/periods/:id', async (req, res) => {
  const period = await Period.findById(req.params.id);
  //https://stackoverflow.com/questions/58251870/findbyidreq-params-id-returns-null-as-response
  res.render('show', { period });
});

//calling periods and to edit the files. find the id and edit it.
app.get('/periods/:id/edit', async (req, res) => {
  const period = await Period.findById(req.params.id);
  res.render('edit', { period });
});

app.put('/periods/:id', async (req, res) => {
  const { id } = req.params;
//req.body allows to access data in a string or JSON object from the client side. Generally use the req. body object to receive data through POST and PUT requests in the Express server.
  const period = await Period.findByIdAndUpdate(id, { ...req.body.period, emotional: req.body.period.emotional || [], physical: req.body.period.physical || [] }, { new: true });
  res.redirect(`/periods/${period.id}`);
});

//Used Besides College Reference for findByID and Update and FindbyID and delete and findbyID
//https://youtu.be/cwa6LciFPmA
//Delete entries
app.delete('/periods/:id', async (req, res) => {
  const { id } = req.params;
  await Period.findByIdAndDelete(id);
  res.redirect('/periods');
});

//-----------Education-------// Education------------------------- // Education -----------------------------//
//-----------Education-------// Education ------------------------- // Education -----------------------------//
//-----------Education-------// Education ------------------------- // Education -----------------------------//

// Education Route
app.get('/education', (req, res) => {
  res.render("education.ejs");
})

//-----------ABOUT-------// ABOUT------------------------- // ABOUT -----------------------------//
//-----------ABOUT-------// ABOUT------------------------- // ABOUT -----------------------------//
//-----------ABOUT-------// ABOUT ------------------------- // ABOUT-----------------------------//

// About Route
app.get('/views/about.ejs', (req, res) => {
  res.render("about.ejs");
})


// SignUp
app.get('/signup', (req, res) => {
  res.render("signup.ejs");
});

// Login
app.get('/login', (req, res) => {
  res.render("login.ejs");
});
// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
