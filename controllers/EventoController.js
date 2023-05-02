const Evento = require('../models/Evento')

const addEvento = async (request, response) => {
const nome = request.body.nome
const local = request.body.local       
const geometria = {type: 'Point', coordinates:[request.body.lng, request.body.lat]}

Evento.create({nome, local, geometria})
.then(() => response.sendStatus(200))
.catch((error) => response.sendStatus(400))
}

let eventos
const encontrarEvento = async (request, response) => {
    eventos = await Evento.findAll();
    response.status(200).send(eventos)
}

const sincronizar = async (request, response) => {
    await Evento.sync();
}

module.exports = {addEvento, encontrarEvento, sincronizar, eventos}