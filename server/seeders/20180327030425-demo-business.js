import faker from 'faker';

const businesses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => ({
  name: faker.company.companyName,
  latitude: faker.address.latitude,
  longitude: faker.address.longitude,
  address: `${faker.address.streetAddress}`,
  userId: index,
  categoryId: index > 6 ? index - (index - 6 + 1) : index,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Businesses', businesses, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Businesses'),

};
