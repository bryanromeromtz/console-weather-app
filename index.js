require('dotenv').config();

const {
  readInput,
  inquirerMenu,
  inquirerPause,
  listPlaces
} = require('./helpers/inquirer');

const Search = require('./models/search');

const main = async () => {

  const searches = new Search();
  let opt;
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // SHOW MESSAGE
        const searchTerm = await readInput('City: '.blue);
        // LOOK FOR THE PLACE 
        const places = await searches.city(searchTerm);
        // SELECT THE PLACE
        const selectID = await listPlaces(places);
        if (selectID === '0') {
          continue
        }
        const selectedPlace = places.find(place => place.id === selectID);

        // ADD  IN DB
        searches.addHistory(selectedPlace.name);

        // CLIMATE
        const climate = await searches.climatePlace(selectedPlace.lat, selectedPlace.lng);
        // SHOW RESULTS
        console.clear()
        console.log('\nCity Information\n'.green);
        const { name, lng, lat } = selectedPlace;
        console.log('City:'.magenta, name.blue);
        console.log('Weather Description:'.magenta, `${climate.desc}`.blue);
        console.log('Lat:'.magenta, `${lat}`.blue);
        console.log('Lng:'.magenta, `${lng}`.blue);
        console.log('Temperature:'.magenta, `${climate.temp}`.blue);
        console.log('Temp Min:'.magenta, `${climate.min}`.blue);
        console.log('Temp Max:'.magenta, `${climate.max}`.blue);

        break;
      case 2:
        searches.history.forEach((place, idx) => {
          console.log(`${idx + 1}: ${place}`)
        })
        break;

    }
    if (opt !== 0) {
      await inquirerPause();
    }
  } while (opt !== 0);
}

main();