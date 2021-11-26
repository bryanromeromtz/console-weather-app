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
        const selectId = await listPlaces(places);
        const selectedPlace = places.find(place => place.id === selectId);
        // CLIMATE
        const { name, lng, lat } = selectedPlace;
        const climate = await searches.climatePlace(lat, lng);
        // SHOW RESULTS
        console.clear()
        console.log('\nCity Information\n'.green);
        console.log('City:'.magenta, name.blue);
        console.log('Weather Description:'.magenta, `${climate.desc}`.blue);
        console.log('Lat:'.magenta, `${lat}`.blue);
        console.log('Lng:'.magenta, `${lng}`.blue);
        console.log('Temperature:'.magenta, `${climate.temp}`.blue);
        console.log('Temp Min:'.magenta, `${climate.min}`.blue);
        console.log('Temp Max:'.magenta, `${climate.max}`.blue);

        break;
      case 2:

        break;
      case 3:

        break;
    }
    if (opt !== 0) {
      await inquirerPause();
    }
  } while (opt !== 0);
}

main();