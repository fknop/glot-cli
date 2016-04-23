'use strict';

const Fs = require('fs');
const Path = require('path');
const CopyPaste = require('copy-paste');

const Files = require('../utils/files');

const Constants = require('../utils/constants');
const SNIPPET_ENDPOINT = Constants.SNIPPET_ENDPOINT;
const SNIPPET_WWW = Constants.SNIPPET_WWW;
const EXTENSIONS = Constants.EXTENSIONS;


const GlotApi = require('../utils/api');

const snippet = function (args, options, cb) {
   
    if (!cb) {
        throw new Error('Missing callback');
    }
    
    args = args || [];
    options = options || {};
    
    const files = [];
    args.forEach((file) => {
       
       try {
           const content = Fs.readFileSync(file, 'utf8');
           
           const ext = Path.extname(file);
           
           files.push({
               name: Path.basename(file),
               content: content
           });
       } 
       catch (e) {
           this.log(`Cannot read file: ${file}, ignoring...`);
       }
        
    });
    
    if (files.length === 0) {
        this.log('No files found.')
        return;
    }
    
    const data = {
        title: options.title || 'Uploaded by CLI (https://www.npmjs.com/package/glot-cli)',
        public: true,
        files: files
    };
    

    if (options.language) {
        data.language = options.language;
    }
    else {
        // Try to determine the language
        
        const ext = Path.extname(files[0].name);
        let key = '*';
        
        if (ext) {
            key = ext.slice(1);
        }
        
        data.language = EXTENSIONS[key];
    }
    
    GlotApi.post(data, (err, res) => {
              
        if (err) {
            this.log(`Couldn't create snippet. Try again.`);
            return;
        }
        
        const id = res.body.id;
        const url = `${SNIPPET_WWW}/${id}`;
        
        CopyPaste.copy(url, () => {
            
            this.log(`${url} copied to clipboard`);
            Files.writeHistory(url);
            cb();
        });
    });

}

module.exports.action = snippet;
