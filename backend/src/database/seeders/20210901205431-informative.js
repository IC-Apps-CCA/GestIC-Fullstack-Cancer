'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const uuid = require('uuid');
    return await queryInterface.bulkInsert('informatives', [
      {
        info_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        info_title: 'Aplicação Gestic recebe deploy',
        info_content: 'O desafio de tornar a aplicação acessível e integrada com o backend foi um sucesso!.',
      },
      {
        info_id: uuid.v4(),
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        info_title: 'Ampliação no calendário acadêmico',
        info_content: 'Devido à fortes chuvas no período de verão, o calendário acadêmico foi ampliado em uma semana, permitindo cumprir os prazos curriculares.',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('informatives', null, {});
  }
};
