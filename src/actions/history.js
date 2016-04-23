'use strict';

const CopyPaste = require('copy-paste');
const Files = require('../utils/files');

const history = function (args, cb) {
   
    if (args.number <= 0) {
        this.log('history: The number must be greater than 0.');
        return cb();
    }
    
    const copy = args.options.copy || false;
    
    if (copy && !args.number) {
        this.log('Missing URL number to copy');
        return cb();
    }
    
    const number = args.number || 10;
    
    if (number === 'reset') {
        Files.initHistory();
        this.log('The history has been cleaned');
        return cb();        
    }
    else if (isNaN(parseInt(number))) {
        this.log('history: The number is not valid');
        return cb();
    }
    
    const position = args.options.position;
    const urls = Files.history.links;
    
    if (urls.length === 0) {
        this.log('No URLs in history');
        return cb();
    }
    
    if (copy) {
        
        if (number > urls.length) {
            this.log('URL not found: not enough urls in history');
            return cb();
        }
        
        let url;
        if (position) {
            url = urls[number - 1];
            if (!url) {
                this.log(`Cannot found url at position: ${position}`);
                return cb();
            }
            
        }
        else {
            
            url = urls[urls.length - number];
        }
        
        CopyPaste.copy(url, () => {
                
            this.log(`${url} copied to clipboard`);
            cb();
        });
        
    } 
    else {
        const length = urls.length;
        const lasts = number >= length ? urls : urls.slice(length - number);
        const links = lasts.map((link, index) => {
     
            return `${number > length ? index + 1 : length - number + index + 1}: ${link}`;
        });
        
        this.log(links.join('\n'));
        cb();
    }
}

module.exports.action = history;
