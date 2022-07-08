'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const uuid = require('uuid');
    return await queryInterface.bulkInsert('complementary_activities', [
      {
        id: uuid.v4(),
        owner: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        title: 'Aplicação Gestic recebe deploy',
        content: 'O desafio de tornar a aplicação acessível e integrada com o backend foi um sucesso!.',
      },
      {
        id: uuid.v4(),
        owner: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        title: 'Ampliação no calendário acadêmico',
        content: 'Devido à fortes chuvas no período de verão, o calendário acadêmico foi ampliado em uma semana, permitindo cumprir os prazos curriculares.',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('complementary_activities', {
      activ_id: ['61e39696-434a-4e2b-89a0-4489751e7834',
      'a2c70423-b13b-4850-a7df-ee164a2cd40f',
    ]});
  }
};
