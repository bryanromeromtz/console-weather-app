const { readInput } = require('./helpers/inquirer');

const main = async () => {
  const text = await readInput("Weather App");
  console.log(text);
}

main();