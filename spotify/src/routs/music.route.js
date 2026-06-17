const express = require('express')
const multer = require('multer')
const musicController = require('../controller/music.controller')

const upload = multer({
    storage: multer.memoryStorage()
})
const router = express.Router()



router.post('/music', upload.single('music') ,  musicController.addMusic);

module.exports = router