// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// Set up app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Set up database connection
mongoose.connect('mongodb+srv://menstrual:i0r3D6rayayhy5bo@sei.3zeldhq.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

// Define data schema
// const periodSchema = new mongoose.Schema({
//   startDate: Date,
//   endDate: Date,
//   flowLength: Number,
//   notes: String
// });

//
const periodSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  flowLength: Number,
  notes: String,
  flowLevel: String,
  cramps: String,
  emotional: String,
  physical: String,
  otherPhysical: String,
  discharge: String,
  temperature: Number,
});


// Create data model
const Period = mongoose.model('Period', periodSchema);

// Define routes
app.get('/', (req, res) => {
  res.redirect('/periods');
});

app.get('/periods', async (req, res) => {
  const periods = await Period.find({});
  res.render('index', { periods });
});

app.get('/periods/new', (req, res) => {
  res.render('new');
});

app.post('/periods', async (req, res) => {
  const period = new Period(req.body.period);
  await period.save();
  res.redirect('/periods');
});

app.get('/periods/:id', async (req, res) => {
  const period = await Period.findById(req.params.id);
  res.render('show', { period });
});

app.get('/periods/:id/edit', async (req, res) => {
  const period = await Period.findById(req.params.id);
  res.render('edit', { period });
});

app.put('/periods/:id', async (req, res) => {
  const { id } = req.params;
  const period = await Period.findByIdAndUpdate(id, { ...req.body.period });
  res.redirect(`/periods/${period.id}`);
});

app.delete('/periods/:id', async (req, res) => {
  const { id } = req.params;
  await Period.findByIdAndDelete(id);
  res.redirect('/periods');
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});



