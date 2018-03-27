
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: {
    	type: DataTypes.DECIMAL,
    	allowNull: false,
    },
    comment: {
    	type: DataTypes.TEXT,
    	allowNull: false,
    },
    reviewer: {
    	type: DataTypes.STRING,
    	allowNull: false,
    },
  }, {});
  Review.associate = (models) => {
    Review.belongsTo(models.Business, {
    	foreignKey: 'businessId',
    	onDelete: 'CASCADE',
    });
  };
  return Review;
};
