const db = require('../models')
const Country = db.country

exports.getAllCountries = (req, res) => {
  Country.findAll()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json({ msg: err.message })
  })
}
