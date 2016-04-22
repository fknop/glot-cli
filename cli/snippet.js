'use strict';

const Fs = require('fs');
const Path = require('path');
const Request = require('superagent');
const SNIPPET_ENDPOINT = require('../constants').SNIPPET_ENDPOINT;
const SNIPPET_WWW = require('../constants').SNIPPET_WWW;
const EXTENSIONS = require('../constants').EXTENSIONS;
const CopyPaste = require('copy-paste');

const snippet = function (args, options) {
   
    
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
           console.warn(`Cannot read file: ${file}, ignoring...`);
       }
        
    });
    
    if (files.length === 0) {
        return;
    }
    
    const data = {
        title: options.title || 'Uploaded by CLI',
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
    
    Request.post(SNIPPET_ENDPOINT)
           .set('Content-Type', 'application/json')
           .send(data)
           .end((err, res) => {
              
              if (err) {
                  console.log(`Couldn't create snippet. Try again.`);
                  return;
              }
              
              const id = res.body.id;
              const url = `${SNIPPET_WWW}/${id}`;
              
              CopyPaste.copy(url, () => {
                  
                console.log(`${url} copied to clipboard`);
              });
           });

}

module.exports.snippet = snippet;
