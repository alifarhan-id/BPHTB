var express = require('express');
var router = express.Router();
var path = require('path');
const filePath = path.join(__dirname, '../client');


/* GET home page. */
router.get('/bphtb_mataram', function (req, res, next) {
  res.sendFile(path.join(filePath, '/index.html'));
});

module.exports = router;