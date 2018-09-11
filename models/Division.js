const District = require('./District');

module.exports = (sequelize, DataTypes) => {
    const Division = sequelize.define('division', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
    });

    Division.associate = (models) => {
        Division.belongsTo(models.district);
    }
    return Division;
}