const db = require('../models')
const config = require('../config/auth.config')
const User = db.user
const { validationResult } = require('express-validator')

const Op = db.Sequelize.Op

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array())
  }
  
  // Save User to Database
  User.create({
    email: req.body.email,
    login: req.body.login,
    real_name: req.body.realName,
    password: bcrypt.hashSync(req.body.password, 8),
    birth_date: req.body.birthDate,
    country: req.body.country
  })
    .then(() => {
      return res.send({ message: 'User was registered successfully!' })
    })
    .catch(err => {
      res.status(500).send({ message: err })
    })
}

exports.signin = (req, res) => {
  const { username } = req.body

  User.findOne({
    where: {
      [Op.or]: [
        { email: { [Op.like]: `%${username}%` } },
        { login: { [Op.like]: `%${username}%` } }
      ]
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!'
        })
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      })

      res.status(200).send({
        id: user.id,
        email: user.email,
        login: user.login,
        real_name: user.real_name,
        birth_date: user.birth_date,
        country: user.country,
        accessToken: token,
        createdAt: user.createdAt
      })
    })

    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}
