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
