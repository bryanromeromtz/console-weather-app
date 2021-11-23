const { 
  readInput, 
  inquirerMenu, 
  inquirerPause 
  } = require('./helpers/inquirer');

const main = async () => {
  let opt;
  do {
    opt = await inquirerMenu();
    console.log({opt});
    // switch (opt) {
    //   case value:
        
    //     break;
    
    //   default:
    //     break;
    // }
    if(opt !== 0 ) {
     await inquirerPause();
    }
  } while (opt !== 0);
}

main();