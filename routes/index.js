var express = require('express');
var router = express.Router();
var { urlMappingService } = require('../services');

router.get('/', async (req, res, next) => {
  const result = await urlMappingService.check();
  res.status(200).json(result)
});

module.exports = router;
