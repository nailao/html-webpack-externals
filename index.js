// If your plugin is direct dependent to the html webpack plugin:
const webpackHtml = require('html-webpack-plugin');

class htmlWebpackExternals {
    constructor(options = {}) {
        this.options = {
            // Change the final link of the module, e.g. {resolve: {jquery: https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js}}
            resolve: options.resolve || {},
            // The directory where the referenced Externals are stored
            dirname: options.dirname || ''
        };
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('htmlWebpackExternals', compilation => {
            // Static Plugin interface |compilation |HOOK NAME | register listener 
            webpackHtml.getHooks(compilation).beforeAssetTagGeneration.tap('htmlWebpackExternals', data => {
                let entryOptions = compilation.options;
                let chunksModules = [];
                let externalsList = [];
                if (Array.isArray(data.plugin.options.chunks)) {
                    let namedChunks = Object.keys(entryOptions.entry).filter(value => data.plugin.options.chunks.includes(value));
                    if (namedChunks.length) {
                        let namedChunksModules = compilation.namedChunks.get(namedChunks[0]);
                        !namedChunksModules || chunksModules.push(namedChunksModules._modules);
                    }
                } else {
                    compilation.namedChunks.forEach(value => chunksModules.push(value._modules));
                }
                if (chunksModules.length) {
                    // Iterate through all external modules
                    chunksModules.forEach(value => value.forEach(item => externalsList.push(item.external ? item.userRequest : '')));
                    // Delete duplicate data
                    externalsList = Array.from(new Set(externalsList)).filter(value => value.length);
                    // Insert into html in order according to webpackConfig.externals
                    !externalsList.length || Object.keys(entryOptions.externals || []).reverse().forEach(value => {
                        !externalsList.includes(value) || data.assets.js.unshift(this.options.resolve[value] || `${entryOptions.output.publicPath + this.options.dirname}/${value}.js`);
                    });
                }
            });
        });
    }
}

module.exports = htmlWebpackExternals;
