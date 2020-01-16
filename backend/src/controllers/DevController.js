const axios = require('axios');
let Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
    }
}

module.exports = {
    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        
        dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/devs/${github_username}`);
            const { name = login, avatar_url = bio } = apiResponse.data;
            const techArrays = parseStringAsArray(techArrays);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            const dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techArrays,
                location,
            })
        }

        return response.json(dev);
    }
};