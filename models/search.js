const axios = require('axios');

const MAPBOX_KEY = process.env.MAPBOX_KEY
const OPENWEATHERMAP_KEY = process.env.OPENWEATHERMAP_KEY
class Search {
  history = [];
  constructor() {

  }
  //lat={lat}&lon={lon}&appid={API key}
  get paramsMapbox() {
    return {
      'limit': 5,
      'language': 'es',
      'access_token': MAPBOX_KEY,
    }
  }

  get paramsOpenweathermap() {
    return {
      appid: OPENWEATHERMAP_KEY,
      units: 'metric',
      lang: 'en'
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

  async climatePlace(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenweathermap, lat, lon }
      });
      const res = await instance.get();
      const { weather, main } = res.data;
      return {
        desc: weather[0].description,
        temp: main.temp,
        min: main.temp_min,
        max: main.temp_max
      }
    } catch (error) {
      log.error(error);
    }
  }
}

module.exports = Search;