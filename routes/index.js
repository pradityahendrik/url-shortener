var express = require('express');
var router = express.Router();
var { urlMappingService } = require('../services');

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
router.post('/shorten', async (req, res, next) => {
  const result = await urlMappingService.shorten(req.body.url);
  res.status(200).json(result)
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
 *         description: Item not found
 */
router.get('/:shortCode', async (req, res, next) => {
  const result = await urlMappingService.getByShortCode(req.params.shortCode);
  res.status(200).json(result)
});

module.exports = router;
