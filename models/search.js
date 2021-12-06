const fs = require('fs')

const axios = require('axios');

const MAPBOX_KEY = process.env.MAPBOX_KEY
const OPENWEATHERMAP_KEY = process.env.OPENWEATHERMAP_KEY


class Search {

  history = [];
  dbPath = './DB/database.json';

  constructor() {
    this.readDB();
  }

  get capitalizedHistory() {
    return this.history.map(place => {
      // return place.charAt(0).toUpperCase() + place.slice(1);
      let words = place.split(' ');
      words = words.map(word => word[0].toUpperCase() + word.substring(1))

      return words.join(' ')
    })
  }


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

  addHistory(place = "") {
    if (this.history.includes(place.toLocaleLowerCase())) {
      return
    }
    this.history = this.history.splice(0, 5);

    this.history.unshift(place.toLocaleLowerCase())

    this.saveDB()
  }

  saveDB() {
    const payload = {
      history: this.history
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return
    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    this.history = data.history;
  }
}

module.exports = Search;