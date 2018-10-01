var webpack = require('webpack');
var path = require("path");

module.exports = {
    devtool:"#source-map",    
    mode: "development",
    entry:"./app/App.js",
    output: {
        filename: "bundle.js",
        sourceMapFilename: "bundle.map"  
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude:/(node_modules|bower_components)/,
            use:[{
                loader:"babel-loader",
                query:{
                    presets:['react','es2015']
                }   
            }]
        }]
    }
}