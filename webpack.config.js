const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = { NODE_ENV: 'production' }) => {
	const envMode = env.NODE_ENV === 'development' ? 'development' : 'production';
	
	return {
		mode: envMode,
		entry: {
			'app': [ './src/main' ]
		},
		output: {
			filename: '[name].js',
			path: path.resolve('public')
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: [
									"@babel/preset-env"
								]
							}
						}
					]
				},
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader"
					]
				},
				{
					test: /\.html$/,
					use: [ 'raw-loader' ]
				}
			]
		},
		resolve: {
			modules: [ path.resolve(__dirname, 'node_modules') ],
			extensions: [ '.js' ],
			alias: {
				'src': path.resolve('src'),
			}
		},
		plugins: [
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: "[name].css",
				chunkFilename: "[id].css"
			}),
			// new webpack.DefinePlugin({
			// 	ENV_MODE: JSON.stringify(envMode),
			// 	config: JSON.stringify(clientConfig)
			// })
		]
	};
}