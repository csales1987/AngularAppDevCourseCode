const ngToolsWebpack = require('@ngtools/webpack'),
      webpack = require('webpack'),
      path = require('path');

var aotPlugin = new ngToolsWebpack.AotPlugin({
    tsConfigPath: "./tsconfig.aot.json",
    entryModule: path.resolve(__dirname, "./src/app/app.module#AppModule"),
});

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: './src/app/main.aot.ts',
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        publicPath: 'src/dist/',
        filename: 'app.main.js'
    },
    plugins: [
        // new ngToolsWebpack.AotPlugin({
        //     mainPath: "src/app/main.ts",
        //     tsConfigPath: './tsconfig.aot.json'
        // }),
        aotPlugin,
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: true
        })
    ],
    module: {
        loaders: [
            {test: /\.css$/, loader: 'raw-loader'},
            {test: /\.html$/, loader: 'raw-loader'},
            {test: /\.ts$/, loader: '@ngtools/webpack'}
        ]
    },
    // devServer: {
    //     historyApiFallback: true
    // }
};

