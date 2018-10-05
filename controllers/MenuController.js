const inquirer = require('inquirer');
const dateFormat = require('dateformat');

module.exports = class MenuController {
  constructor(){
    this.mainMenuQuestions = [
      {
        type: 'list',
        name: 'mainMenuChoice',
        message: 'Please choose form an option below',
        choices: [
          'Add new contact',
          'Get date',
          'Exit'
        ]
      }
    ];
    this.contacts = [];
  }

  main(){
    console.log('Welcome to Address Book!');
    inquirer.prompt(this.mainMenuQuestions).then((response) => {
      switch(response.mainMenuChoice){
        case 'Add new contact':
          this.addContact();
          break;
        case 'Get date':
          this.getDate();
          break;
        case 'Exit':
          this.exit();
        default:
          console.log('Invalid Input');
          this.main();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  clear(){
    console.log('\x1Bc');
  }

  addContact() {
    this.clear();
    console.log('addContact called');
    this.main();
  }

  getDate(){
    this.clear();
    const now = new Date();
    const date = dateFormat(now);
    console.log(date);
    this.main();
  }

  exit(){
    console.log('Thanks for using Address Book!');
    process.exit();
  }
}
