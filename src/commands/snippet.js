    
    
module.exports.command = function (vorpal, action) {
    
    vorpal
        .command('snippet [files...]', 'Upload a snippet.')
        .alias('s')   
        .option('-t, --title <title>', 'Snippet title')
        .option('-l, --language <language>', 'Snippet language')
        .option('-p, --private', 'Private snippet: requires token')
        .option('-T, --token', 'API Token')
        .action(function (args, cb) {
              
            try {        
                action.call(this, args.files, args.options, cb);
            }
            catch (e) {
                this.log(e);
            }
        });
}