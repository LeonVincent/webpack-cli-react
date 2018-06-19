const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
  output: {
    path: __dirname + "/build", //打包后的文件存放的地方
    filename: "bundle-[hash].js" //打包后输出文件的文件名
  },
  devServer: {
    contentBase: "./public",
    historyApiFallback: true, //不跳转
    inline: true, //时时刷新,
    port: '8989',
    hot: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: [
          //     "env", "react"
          //   ]
          // }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },{
            loader: "css-loader",
            options: {
              module: true,//指定启用 css node_modules
              localIdentName: '[name]__[local]--[hash:base64:5]'//指定css的类名格式
            }
          },{
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ]
}
