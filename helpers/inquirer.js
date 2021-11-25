const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Search City`
      },
      {
        value: 2,
        name: `${'2.'.green} History`
      },
      {
        value: 0,
        name: `${'0.'.green} Get Out`
      },
    ]
  }
]




const inquirerMenu = async () => {
  console.clear();
  console.log('======================'.green);
  console.log('   Select an option   '.white);
  console.log('======================\n'.green);
  const { option } = await inquirer
    .prompt(questions);
  return option;
}

const inquirerPause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'ENTER'.bgWhite.black} to continue`,
    }
  ]
  console.log('\n');
  await inquirer.prompt(question);
}

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return `please insert a value`.red;
        }
        return true;
      }
    }
  ]
  console.log('\n');
  const { desc } = await inquirer.prompt(question);
  return desc;
}

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = `${i + 1}`.green;
    const { id, name } = place
    return {
      value: id,
      name: `${idx} ${name}`
    }
  });
  choices.unshift({
    value: '0',
    name: '0.'.green + 'Cancel'
  })
  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select Place',
      choices,
    }
  ]
  const { id } = await inquirer.prompt(questions);
  return id;
}


const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
      validate(value) {
        if (value.length === 0) {
          return `please insert a value`.red;
        }
        return true;
      }
    }
  ]
  console.log('\n');
  const { ok } = await inquirer.prompt(question);
  return ok;
}

const showChecklist = async (places = []) => {
  const choices = places.map((task, i) => {
    const idx = `${i + 1}`.green;
    const { _id, desc } = task
    return {
      value: _id,
      name: `${idx} ${desc}`,
      checked: (task.completedIn) ? true : false
    }
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selections',
      choices,
    }
  ]
  const { ids } = await inquirer.prompt(question);
  return ids;
}



module.exports = {
  inquirerMenu,
  inquirerPause,
  readInput,
  listPlaces,
  confirm,
  showChecklist
}