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
      return res.data.features.map(place => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }))
    } catch (error) {
      return []
    }
  }
}

module.exports = Search;