module.exports = (sequelize, DataTypes) =>{
    const gender = sequelize.define('gender', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull:false}
    })
    return gender;
}