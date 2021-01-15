'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('categories', [
      {
        description: 'Projetos',
        created_at: new Date(),
        updated_at: new Date() 
      },
      {
        description: 'Web Backend',
        created_at: new Date(),
        updated_at: new Date()        
      },
      {
        description: 'Web Frontend',
        created_at: new Date(),
        updated_at: new Date()        
      },
      {
        description: 'Mobile Frontend',
        created_at: new Date(),
        updated_at: new Date()        
      },
      {
        description: 'Mobile Backend',
        created_at: new Date(),
        updated_at: new Date()        
      },
      {
        description: 'Sistema Operacionais',
        created_at: new Date(),
        updated_at: new Date()        
      },
      {
        description: 'Hardware',
        created_at: new Date(),
        updated_at: new Date()        
      },
      {
        description: 'POO',
        created_at: new Date(),
        updated_at: new Date()        
      },
      {
        description: 'Testes de Software',
        created_at: new Date(),
        updated_at: new Date()        
      },
      {
        description: 'Redes',
        created_at: new Date(),
        updated_at: new Date()        
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('categories', null);
  }
};
