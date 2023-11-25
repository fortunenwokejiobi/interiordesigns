const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./server/index.js",

  target: "node",

  externals: [nodeExternals()],
  mode: 'development',

  output: {
    path: path.resolve("build-server"),
    filename: "index.js"
  },

  module:
    {
        rules:[
            {test:/\.js$/,exclude:/node_modules/,loader:"babel-loader",options:{presets:["@babel/preset-env","@babel/preset-react"]}},
        {
            test: /.css$/, 
            use: ["style-loader", "css-loader"], 
          },]
    }
};
