module.exports = (sequelize, DataTypes) => {
    const NaturalPerson = sequelize.define('naturalPerson', {
        nationalId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, },
        firstName: DataTypes.STRING(200),
        secondName: DataTypes.STRING(200),
        thirdName: DataTypes.STRING(200),
        surname: DataTypes.STRING(200),
        passportNumber: DataTypes.STRING(50),
        serviceId: DataTypes.INTEGER,
        alienId: DataTypes.INTEGER,
    },{
        //initialAutoIncrement: '100000'
    })
    NaturalPerson.associate = (models) => {
        NaturalPerson.belongsTo(models.district);
        NaturalPerson.belongsTo(models.division);
        NaturalPerson.belongsTo(models.gender);
    };
    return NaturalPerson;
}