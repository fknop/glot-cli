#!/usr/bin/env node

'use strict';

const Program = require('commander');

Program
    .version('1.0.0')
    .arguments('<cmd> [options...]')
    .option('-t, --title <n>', 'Snippet title')
    .option('-l, --language <n>', 'Snippet language')
    .action((cmd, options) => {
       	
        try {        
            require(`../cli/${cmd}`)[cmd](options, Program);
        }
        catch (e) {
            console.log(`Command ${cmd} does not exists`);
        }
    })
    .parse(process.argv);
  
  
