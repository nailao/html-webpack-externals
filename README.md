<div align="center">
    <a href="https://github.com/webpack/webpack">
        <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
    </a>
</div>

# html-webpack-externals 
A plugin for [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) that insert into html in order according to webpackConfig.externals.

## Look
This plugin must webpack >= 4, html-webpack-plugin >= 4.0.

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
