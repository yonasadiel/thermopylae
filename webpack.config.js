const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "./src/index.ts"),
    module: {
        rules: [
            {
                test: /.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [ { from: "public" } ],
        }),
    ],
    output: {
        filename: "js/index.js",
        path: path.resolve(__dirname, "out"),
    },
}; 
