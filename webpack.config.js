var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var fs = require("fs");

//获取app下面的所有输出js,多页面嘛
function getEntry() {
    //return path.resolve(__dirname, "./app/main.js");
    var jsPath = fs.readdirSync("./app/");
    var matchs = [], files = {};
    jsPath.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/); //查找app下的js文件     
        if (matchs) {
            files[matchs[1]] = path.resolve(__dirname + "/app/", item);
        }
    });
    return files;
}

// function pages() {   
//     var htmlPath=fs.readdirSync(path.resolve(__dirname,"./app/views/"));
//     var matchs = [], files = {};  
//     htmlPath.forEach(function (item) {      
//         matchs=item.match(/(.+)\.html$/);    
//         var temp={filename:matchs[0],template:path.resolve(__dirname,'./app/views/'+matchs[0]),inject:false};      
//         new HtmlWebpackPlugin(temp);
//     });
// }

module.exports = {
    //cache:ture,//开启编译缓存
    /*
    entry: {
        app: path.resolve(__dirname, "./app/main.js") //可以把下面webpack-hot-xx的相关信息放到dev-server.js中去动态添加
        //webpack-hot-middleware/client开启热加载，noInfo=true不要console显示编译信息
        //app:["webpack-hot-middleware/client?noInfo=true&reload=true",path.resolve(__dirname,"./app/main.js")]
    },
    */    
    entry: getEntry(), //这样可以方便支持多文件
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
            },
            // {
            //     test: /\.jsx$/,
            //     exclude: /node_modules/,
            //     loader: "babel-loader?optional=runtime&cacheDirectory" //开启cacheDirectory提高编译速度
            // }
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                            optional: "runtime",
                            cacheDirectory: true
                        }
            }
        ]
    },
    plugins: [
        //这里的HtmlWebpackPlugin可以做动态添加
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',//渲染输出html文件名,路径相对于 output.path 的值
        //     template: path.resolve(__dirname, './app/views/index.html'), //渲染源模版文件
        //     inject: false //这个东西非常重要，true: 自动写入依赖文件; false: 不写入依赖，构建多页面非常有用
        // }),
        // new HtmlWebpackPlugin({
        //     filename: 'home.html',//渲染输出html文件名,路径相对于 output.path 的值
        //     template: path.resolve(__dirname, './app/views/home.html'), //渲染源模版文件
        //     inject: false //这个东西非常重要，true: 自动写入依赖文件; false: 不写入依赖，构建多页面非常有用
        // }),

        //pages(), //这样直接调用报错，所以把这部分放到dev-server.js里面

        new webpack.HotModuleReplacementPlugin()
    ]
};