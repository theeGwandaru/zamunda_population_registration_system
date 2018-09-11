module.exports = (sequelize, DataTypes) => {
    const District = sequelize.define('district', {
        id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        name: {type: DataTypes.STRING(200)}
    })

    return District;
}