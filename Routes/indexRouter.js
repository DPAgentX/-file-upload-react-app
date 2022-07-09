const router = require('express').Router();
const File = require('../Models/File');
const path = require('path')
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./Client/build", "index.html"));
})
router.get('/api', (req, res) => {
    res.json({ "name": "Deep" })
})

module.exports = router