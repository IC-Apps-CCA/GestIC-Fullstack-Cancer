'use strict';

const uuid = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('researches', [
      {
        rsrch_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        rsrch_name: 'NEES',
        rsrch_description: '',
        rsrch_activities: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rsrch_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        rsrch_name: 'LaCCAN',
        rsrch_description: '',
        rsrch_activities: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rsrch_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        rsrch_name: 'OptLab',
        rsrch_description: '',
        rsrch_activities: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rsrch_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        rsrch_name: 'EDGE',
        rsrch_description: '',
        rsrch_activities: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rsrch_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        rsrch_name: 'BrAIN',
        rsrch_description: '',
        rsrch_activities: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rsrch_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        rsrch_name: 'EASY',
        rsrch_description: '',
        rsrch_activities: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rsrch_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        rsrch_name: 'EASY-SPARC',
        rsrch_description: '',
        rsrch_activities: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rsrch_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        rsrch_name: 'Optical Network Laboratory',
        rsrch_description: '',
        rsrch_activities: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rsrch_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        rsrch_name: 'LCCV',
        rsrch_description: '',
        rsrch_activities: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rsrch_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        rsrch_name: 'LaTIM',
        rsrch_description: '',
        rsrch_activities: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rsrch_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        rsrch_name: 'CPTE',
        rsrch_description: '',
        rsrch_activities: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rsrch_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        rsrch_name: 'LED',
        rsrch_description: '',
        rsrch_activities: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('researches', null, {})
  }
};
