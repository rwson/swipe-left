var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: "./src/index",
    output: {
        publicPath: "/",
        filename: "main.js"
    },
    include: [
        path.resolve(__dirname, "src"),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            include: path.join(__dirname, "src"),
            loader: "babel-loader",
            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015', 'stage-2']
            }
        }]
    },
    plugins: [
      new webpack.OldWatchingPlugin()
    ]
};
