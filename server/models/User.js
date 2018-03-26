
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Phone number already in use!',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: 'Email address already in use!',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  User.associate = (models) => {
    User.hasOne(models.Business, {
      foreignKey: 'userId',
    });
  };
  return User;
};
