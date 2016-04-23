const Request = require('superagent');
const Constants = require('./constants');

const post = function (data, cb) {
    
    Request.post(Constants.SNIPPET_ENDPOINT)
           .set('Content-Type', 'application/json')
           .send(data)
           .end(cb);
}


module.exports = {
    post: post  
};