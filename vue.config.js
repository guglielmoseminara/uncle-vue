var nodeExternals = require('webpack-node-externals');

module.exports = {
    configureWebpack: {
        target: 'node',
        externals: [nodeExternals()]
    }
}