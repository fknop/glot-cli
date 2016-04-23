    
    
module.exports.command = function (vorpal, action) {
        
    vorpal.catch('[cmd]')
        .action(function (args, cb) {
            action.call(this, vorpal, args, cb);
    });
}