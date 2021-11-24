const {
  readInput,
  inquirerMenu,
  inquirerPause
} = require('./helpers/inquirer');

const Search = require('./models/search');

const main = async () => {

  const searches = new Search();
  let opt;
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const place = await readInput('City: ');
        await searches.city(place);

        console.log('\nInformacion de la ciudad\n'.green);
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