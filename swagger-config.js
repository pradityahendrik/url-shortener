const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener',
      version: '1.0.0',
      description: 'A sample API to demonstrate shortening url',
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
