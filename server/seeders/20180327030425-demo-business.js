const faker = require('faker');

const length = Array(10).fill().map((x, i) => i + 1);

const businesses = length.map(val => ({
  name: val === 1 || val === 3 ? `andela ${faker.company.companyName()}` : faker.company.companyName(),
  latitude: faker.address.latitude(),
  longitude: faker.address.longitude(),
  address: val === 1 || val === 3 ? `${faker.address.streetAddress()} ${faker.address.city()} lagos` : `${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.state()}`,
  userId: val,
  categoryId: val > 6 ? 3 : val,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Businesses', businesses, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Businesses'),

};
