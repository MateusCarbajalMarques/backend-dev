const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');

const {setupWebSocket} = require('./websocket');

const app = express();
const server = http.Server(app);
setupWebSocket(server);

mongoose.connect('mongodb+srv://teste:mcm123456@cluster0-lxuz5.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);
// Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetros
// Query Params: req.query(Filtros, ordenação, paginação, ...)
// Route Params: req.params (Identificar um recurso na alterção ou remoção)
// Body: req.body (Dados para criação ou alteração um registro)


server.listen(process.env.PORT || 3333);