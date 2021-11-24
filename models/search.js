const axios = require('axios');

class Search {
  history = [];
  constructor() {

  }

  get paramsMapbox() {
    return {
      'limit': 5,
      'language': 'es',
      'access_token': 'pk.eyJ1IjoiYnJ5YW4tYWt1c2VyIiwiYSI6ImNrd2QyNmlyeTh2b3MydW10N2F2YTRrNW0ifQ.JcGG4lWCizcpdDjjFp2rEA',
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