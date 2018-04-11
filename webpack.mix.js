let mix = require('laravel-mix');
var LiveReloadPlugin = require('webpack-livereload-plugin');

mix.sass('./resources/scss/app.scss','assets/css/app.css');
mix.js('./resources/js/app.js','assets/js/app.js');
mix.webpackConfig({
	plugins: [
	new LiveReloadPlugin()
	]
});