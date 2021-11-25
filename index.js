require('dotenv').config();
const colors = require('colors');
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

        // SHOW RESULTS
        console.log('\nInformacion de la ciudad\n'.green);
        const { name, lng, lat } = selectedPlace;
        console.log('City:'.magenta, name.blue);
        console.log('Lat:'.magenta, `${lat}`.blue);
        console.log('Lng:'.magenta, `${lng}`.blue);
        console.log('Temperature:');
        console.log('Minimum:');
        console.log('Maximum:');

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