const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray =  require('../Ultis/parseStringAsArray');
const { findConnections, sendMessage  } = require('../websocket');

//index:Listar, show: unico na lista, update: alterar, destroy: apagar 
module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const {github_username, techs, latitude, longitude } = request.body;
    
        let dev = await Dev.findOne({github_username});

        if (!dev){

        
        
        const apiresponse = await axios.get(`https://api.github.com/users/${github_username}`);
        const { name = login, avatar_url, bio} =  apiresponse.data;
    
        const techsArray = parseStringAsArray(techs);
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }
    
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs:techsArray,
            location,
        })

        //Filtrar as conexões que estaño maximo 10km de distancia
        //e que o novo dev tenha pelo umas das techs filtradas
        const sendSocketMessageTo = findConnections(
            { latitude, longitude},
            techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }
        return response.json(dev);
    }
}