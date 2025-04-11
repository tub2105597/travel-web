const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('traveldb', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

let testConnectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log('----------------------------------------------')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        console.log('------------------------------------')
    }
};

module.exports = testConnectDB;