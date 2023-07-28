const express = require('express')
const router = express.Router()
const indexController = require('../controllers/index')

router.get('/', indexController.getIndex) //uses home controller to get index page and render index.js from views

module.exports = router