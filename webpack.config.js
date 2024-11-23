const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "./src/index.tsx"),
    performance: {
        maxAssetSize: 512 * 1024,
        maxEntrypointSize: 512 * 1024,
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ],
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
