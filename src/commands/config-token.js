    
    
module.exports.command = function (vorpal, action) {
    
    vorpal
        .command('config token <token>', 'Add or replace the default API token')
        .action(function (args, cb) {
              
            try {        
                action.call(this, args, cb);
            }
            catch (e) {
                this.log(e);
            }
        });
}