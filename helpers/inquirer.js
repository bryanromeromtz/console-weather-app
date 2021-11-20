const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Create task`
      },
      {
        value: '2',
        name: `${'2.'.green} List Tasks`
      },
      {
        value: '3',
        name: `${'3.'.green} List Completed Tasks`
      },
      {
        value: '4',
        name: `${'4.'.green} List Pending Tasks`
      },
      {
        value: '5',
        name: `${'5.'.green} Complete Task(s)`
      },
      {
        value: '6',
        name: `${'6.'.green} Delete Task`
      },
      {
        value: '0',
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

const listTasksToDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}`.green;
    const { _id, desc } = task
    return {
      value: _id,
      name: `${idx} ${desc}`
    }
  });
  choices.unshift({
    value: '0',
    name: '0.'.green + 'Cancel'
  })
  const questionsDeleteTask = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete Task',
      choices,
    }
  ]
  const { id } = await inquirer.prompt(questionsDeleteTask);
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

const showChecklist = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
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
  listTasksToDelete,
  confirm,
  showChecklist
}