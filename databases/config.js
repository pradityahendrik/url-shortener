const Sequelize = require('sequelize');

const sequelize = new Sequelize('pelindo', 'admin', 'admin', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize
