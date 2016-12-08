var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack=require("webpack");
module.exports = {
    entry: {
        //app: path.resolve(__dirname, "./app/main.js")
        app:["webpack-hot-middleware/client",path.resolve(__dirname,"./app/main.js")]
    },
    output: {
        path: path.resolve(__dirname, "./output/static"),
        publicPath: "/",//调试或者 CDN 之类的域名
        filename: "[name].js"
    },
    resolve: {
        root: __dirname,
        extensions: ["", ".js", ".jsx", ".vue"]
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: "vue" },
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({      
            filename: 'index.html',//渲染输出html文件名,路径相对于 output.path 的值
            template: path.resolve(__dirname, './app/views/index.html'), //渲染源模版文件
            inject: true //这个东西非常重要，true: 自动写入依赖文件; false: 不写入依赖，构建多页面非常有用
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};