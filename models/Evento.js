const Sequelize = require ('sequelize');
const database = require('../database/db')

const Evento = database.define('evento', {

    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    local:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    geometria: {
        type: Sequelize.GEOMETRY('GEOMETRY'),
        allowNull: false,
      },
})

module.exports = Evento;