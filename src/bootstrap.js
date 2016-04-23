'use strict';


const commands = [
    'snippet'
];

const commandsPath = './commands';
const actionsPath = './actions';


module.exports.bootstrap = function (vorpal) {
  
    commands.forEach((name) => {
        
        const command = require(`${commandsPath}/${name}`).command;
        const action = require(`${actionsPath}/${name}`).action;
        command(vorpal, action);
        
        
        // Exit is not used
        const exit = vorpal.find('exit');
        if (exit) {
            exit.remove();
        }
        
    });       
    vorpal.parse(process.argv); 
};