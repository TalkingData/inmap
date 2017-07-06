let config = {
    apiPath: 'http://localhost:3000',
    workerPath: 'http://localhost:3000/dist/worker.js'
}

if (typeof Window !== 'undefined' && window.TD && window.TD.config) {
    Object.assign(config, window.TD.config);
}

module.exports = config;