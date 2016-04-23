module.exports.action = function (vorpal, args, cb) {
    
    if (args.cmd) {   
        this.log(args.cmd + ' is not a valid command, showing help.');
    }

    vorpal.execSync('help');
    cb(); 
};