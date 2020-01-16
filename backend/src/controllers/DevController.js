const axios = require('axios');
let Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        response.json(devs)
    },

    async store (request, response) {
        const { github_username = login, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name, avatar_url, bio } = apiResponse.data;
            const techArrays = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                name,
                github_username,
                avatar_url,
                bio,
                techs: techArrays,
                location,
            })
        }

        return response.json(dev);
    }
}