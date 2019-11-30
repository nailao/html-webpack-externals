
# html-webpack-externals [![NPM version](https://badge.fury.io/js/html-webpack-externals.svg)](http://badge.fury.io/js/html-webpack-externals)

A plugin for [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) that insert into html in order according to webpackConfig.externals.

## Install

```shell
$ npm install html-webpack-externals --save-dev
```

### Example

```js
const webpackHtmlPlugin = require('html-webpack-plugin');
const webpackHtmlExternals = require('html-webpack-externals');

{
    externals: {
        'socketio': 'io'
    },
    plugins: [
        new webpackHtmlPlugin(),
        new webpackHtmlExternals({
            resolve: {
                'socketio': 'https://cdn.bootcss.com/socket.io/2.3.0/socket.io.slim.js'
            },
            dirname: 'public'
        })
    ]
}

```
