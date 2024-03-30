var express = require('express');
var router = express.Router();
const { validateInput } = require('../utils/validations');
const { urlMappingSchema  } = require('../utils/validations/schemas/url_mapping_schema');
const urlMappingService = require('../services/url_mapping_service');

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Generate and store short url
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: Long url
 *     responses:
 *       201:
 *         description: Successfully generate and store short url
 *       400:
 *         description: Bad request, invalid input
 */
router.post('/shorten', validateInput(urlMappingSchema.shortenUrl), async (req, res, next) => {
  const result = await urlMappingService.shorten(req.body.url);
  res.status(result.code).json(result.response);
});

/**
 * @swagger
 * /{shortCode}:
 *   get:
 *     summary: Get a url data by short code
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The Short Code to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved url data by short code
 *       404:
 *         description: Data not found
 */
router.get('/:shortCode', validateInput(urlMappingSchema.getByShortCode), async (req, res, next) => {
  const result = await urlMappingService.getByShortCode(req.params.shortCode);
  res.status(result.code).json(result.response);
});

module.exports = router;
