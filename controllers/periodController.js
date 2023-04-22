// Import model
const Period = require('../models/period');

// Export controller functions
module.exports = {
  index: async (req, res) => {
    const periods = await Period.find({});
    res.render('index', { periods });
  },
  new: (req, res) => {
    res.render('new');
  },
  create: async (req, res) => {
    const period = new Period(req.body.period);
    await period.save();
    res.redirect('/periods');
  },
  show: async (req, res) => {
    const period = await Period.findById(req.params.id);
    res.render('show', { period });
  },
  edit: async (req, res) => {
    const period = await Period.findById(req.params.id);
    res.render('edit', { period });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const period = await Period.findByIdAndUpdate(id, { ...req.body.period });
    res.redirect(`/periods/${period.id}`);
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    await Period.findByIdAndDelete(id);
    res.redirect('/periods');
  }
};

// Summary of Controller and References
// The code is about handling requests to the '/periods' route.
// There are several methods that do different things:
// The 'index' method fetches all documents from the 'Period' collection in the database and shows them on the index page.
// The 'new' method displays a form for creating a new menstrual period.
// The 'create' method takes the data submitted from the form, creates a new 'Period' document in the database, saves it, and redirects the user to the '/periods' route.
// The 'show' method displays a single 'Period' document by its ID on the show page.
// The 'edit' method displays a single 'Period' document by its ID on the edit page.
// The 'update' method takes the data submitted from the edit form, updates the 'Period' document in the database, and redirects the user to the updated 'Period's' show page.
// The 'destroy' method deletes a 'Period' document by its ID from the database and redirects the user to the '/periods' route.

// Reference:
// Traversy (https://www.youtube.com/watch?v=ZKwrOXl5TDI
// FreeCodeCamp: https://www.youtube.com/watch?v=9OPP_1eAENg)
// Adnan Ahmed https://github.com/adnanahmed92/nodejs-express-mongodb-tutorial)
//Made With Eldor: https://youtu.be/uJ-R_lHVt5Y
//The Net Ninja: https://youtu.be/DPHn_qs44QM
//Assistance from Chris South, Professor