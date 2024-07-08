const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./source/main.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [new HtmlWebpackPlugin({
            template: "./source/index.html"
        }
    )],
    module: {
        rules: [
            {
                test: /\/css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
}