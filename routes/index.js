var express = require('express');
var router = express.Router();
var { urlMappingService } = require('../services');

router.post('/shorten', async (req, res, next) => {
  const result = await urlMappingService.shorten(req.body.url);
  res.status(200).json(result)
});

router.get('/', async (req, res, next) => {
  const result = await urlMappingService.check();
  res.status(200).json(result)
});

module.exports = router;
