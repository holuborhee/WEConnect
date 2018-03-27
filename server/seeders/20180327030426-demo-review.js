import faker from 'faker';

const length = new Array(50);


const reviews = length.map((len, index) => {
  const count = index + 1;
  return {
    rating: count % 10 === 0 ? 5.0 : (count % 10) / 2,
    comment: faker.lorem.text,
    reviewer: faker.name.findName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    businessId: count % 10 || 10,
  };
});

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Reviews', reviews, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Reviews'),
};
