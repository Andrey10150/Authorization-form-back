const { verifySignUp } = require('../middlewares')
const controller = require('../controllers/auth.controller')
const {check} = require('express-validator')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.post(
    '/api/auth/signup',
    verifySignUp.checkDuplicateUsernameOrEmail,
    [
      check(
        'login',
        'Login must be 3 or more characters long and also less or equal 255'
      )
        .exists()
        .isLength({ min: 3, max: 255 }),
      check('email', 'Invalid email address').isLength({ max: 255 }).isEmail(),
      check(
        'password',
        'Password must be more than 6 characters and less than 255'
      )
        .exists()
        .isLength({ min: 6, max: 255 }),
      check('birthDate', 'Birth date must be selected').notEmpty(),
      check('country', 'Country must be selected').isLength({min: 1}),
      check(
        'realName',
        'Length of name must be not empty and less than 255'
      ).isLength({ min: 1, max: 255 })
    ],
    controller.signup
  )

  app.post('/api/auth/signin', controller.signin)
}
