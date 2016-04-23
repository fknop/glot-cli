'use strict';
    
module.exports.command = function (vorpal, action) {
    
    vorpal
        .command('history [number]', 'Upload a snippet.')
        .alias('h')   
        .option('-c, --copy', 'Copy to clipboard')
        .option('-p, --position', 'Starts from the beginning of the history instead of the end.')
        .action(function (args, cb) {
              
            try {        
                action.call(this, args, cb);
            }
            catch (e) {
                this.log(e);
            }
        });
}