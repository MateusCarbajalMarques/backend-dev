const Dev = require('../models/Dev');
const parseStringAsArray =  require('../Ultis/parseStringAsArray');
module.exports = {
    async index(request, response) {
        const {latitude, longitude, techs} = request.query ;

        const techsArray = parseStringAsArray(techs);

        const dev = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates:[longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            }
        });
        // buscaR todos devs num raio 10 km
        // Filtrar por tecnologias
        return response.json({dev});

    }
}