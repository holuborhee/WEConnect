const categoriesArray = ['Fashion', 'Info Tech', 'Hotel Restaurants', 'Education', 'Banking and Finance', 'Block Chain'];

const categories = categoriesArray.map(category => ({ name: category, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
module.exports = {
  /* eslint no-unused-vars: "off" */
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Categories', categories, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Categories'),
};
