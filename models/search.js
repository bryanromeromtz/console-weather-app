const axios = require('axios');

const MAPBOX_KEY = process.env.MAPBOX_KEY
class Search {
  history = [];
  constructor() {

  }

  get paramsMapbox() {
    return {
      'limit': 5,
      'language': 'es',
      'access_token': MAPBOX_KEY,
    }
  }

  async city(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox
      })
      const res = await instance.get();
      console.log(res.data);
      return []
    } catch (error) {
      return []
    }
  }
}

module.exports = Search;