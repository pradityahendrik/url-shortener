'use strict';

const tableOpts = {
  tableName: 'url_mapping'
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    queryInterface.createTable(tableOpts, {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      long_url: {
          type: DataTypes.TEXT,
          allowNull: false
      },
      short_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {
          type: DataTypes.DATE,
          allowNull: true
      },
      updated_at: {
          type: DataTypes.DATE,
          allowNull: true
      },
      deleted_at: {
          type: DataTypes.DATE,
          allowNull: true
      }
    })
  },

  async down (queryInterface, DataTypes) {
    queryInterface.dropTable(tableOpts)
  }
};
