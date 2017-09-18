let config = {
    apiPath: null,
    workerPath: null
}

if (typeof Window !== 'undefined' && window.TD && window.TD.config) {
    Object.assign(config, window.TD.config);
}

module.exports = config;