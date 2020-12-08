const controller = require('../controllers/country.controller')

module.exports = function (app) {
  
  app.get('/api/countries', controller.getAllCountries)
}
