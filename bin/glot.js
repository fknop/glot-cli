#!/usr/bin/env node

'use strict';

const Vorpal = require('vorpal');

require('../src/bootstrap').bootstrap(new Vorpal());
    