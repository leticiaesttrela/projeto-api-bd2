require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
const port = process.env.API_PORT;
const eventoController = require('./controllers/EventoController')

eventoController.sincronizar()

app.get('/', eventoController.sincronizar)
app.get('/encontrarEvento', eventoController.encontrarEvento)
app.post('/eventos', eventoController.addEvento)

app.listen(port, () => {
    console.log(`rodando na porta ${port}`)
})