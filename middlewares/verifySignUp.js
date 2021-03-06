const db = require('../models')
const User = db.user

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      login: req.body.login
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Login is already in use!'
      })
      return
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: 'Failed! Email is already in use!'
        })
        return
      }

      next()
    })
  })
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail
}

module.exports = verifySignUp
