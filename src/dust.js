const Nightmare = require('nightmare');
const utils = require('./utils');
const { URL } = require('../config');

module.exports = class Dust {
    constructor() {
        this.nightmare = new Nightmare();
    }

    run() {
        this.nightmare
            .goto(URL)
            .wait('#contents')
            .evaluate(utils.makeData)
            .end()
            .then(utils.makeTemplate)
            .catch(error => console.error(`Error: ${error.message}`));
    }
}

