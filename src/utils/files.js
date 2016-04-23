'use strict';

const Os = require('os');
const Fs = require('fs');
const Path = require('path');
const Constants = require('./constants');

const paths = {
    folder: Path.join(Os.homedir(), Constants.GLOT_FOLDER),
    config: Path.join(Os.homedir(), Constants.GLOT_FOLDER, Constants.CONFIG_FILE),
    history: Path.join(Os.homedir(), Constants.GLOT_FOLDER, Constants.HISTORY_FILE)
};

const defaults = {
    config: {},
    history: {
        links: []
    }
}

const files = Object.assign({}, defaults);

const readConfig = function () {
    
    return Fs.readFileSync(paths.config, 'utf8');
};

const readHistory = function () {
    
    return Fs.readFileSync(paths.history, 'utf8');
};

const write = function (path, data) {
  
    Fs.writeFileSync(path, JSON.stringify(data, null, 4));  
};


const writeConfig = function (data) {
    
    write(paths.config, Object.assign({}, files.config, data));
};

const writeHistory = function (link) {
    
    const history = Object.assign({}, files.history);
    if (Array.isArray(link)) {
        history.links.push(...link);
    }
    else {
        history.links.push(link);
    }
    
    write(paths.history, history);
};

const initFolder = function () {

    try {
        Fs.statSync(paths.folder);
    }
    catch (e) {
        Fs.mkdirSync(paths.folder);
    }
};



const initConfig = function () {
    
    initFolder();
    write(paths.config, defaults.config);
};

const initHistory = function () {
    
    initFolder();
    write(paths.history, defaults.history);
}

const load = function (path) {
    
    const content = Fs.readFileSync(path);
    return JSON.parse(content);
}

const loadConfig = function () {
      
    try {
        files.config = load(paths.config);
        return files.config;
    }
    catch (e) {
        initConfig();
        return loadConfig();
    }
};

const loadHistory = function () {
    
    try {
        files.history = load(paths.history);
        return files.history;
    }
    catch (e) {
        initHistory();
        return loadHistory();
    }
}

loadConfig();
loadHistory();

module.exports = {
    history: files.history,
    config: files.config,
    loadHistory: loadHistory,
    loadConfig: loadConfig,
    writeConfig: writeConfig,
    writeHistory: writeHistory,
    initHistory: initHistory
}



