'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const uuid = require('uuid');
    return await queryInterface.bulkInsert('informative', [
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
    return await queryInterface.bulkDelete('informative', null, {});
  }
};
