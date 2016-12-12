var express = require("express");
var app = express();
var port = process.env.port || 3000;

//动态输出多个html
var path = require("path");
var fs=require("fs");
var HtmlWebpackPlugin = require("html-webpack-plugin");

/*
*引入webpack及其配置config
*/
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

//var devClient = 'webpack-hot-middleware/client?noInfo=true&reload=true';//把这个放到dev-client.js里面，以便热更新html
var devClient = './dev-client';
Object.keys(webpackConfig.entry).forEach(function (name, i) {
    var extras = [devClient];
    webpackConfig.entry[name] = extras.concat(webpackConfig.entry[name]);
});

//动态输出多个html
(function pages() {   
    var htmlPath=fs.readdirSync(path.resolve(__dirname,"./app/views/"));
    console.log(33);
    var matchs = [], files = {};  
    htmlPath.forEach(function (item) {      
        matchs=item.match(/(.+)\.html$/);    
        var temp={filename:matchs[0],template:path.resolve(__dirname,'./app/views/'+matchs[0]),inject:false};      
        webpackConfig.plugins.push(new HtmlWebpackPlugin(temp));
        console.log(11);   
    });
}());

//调用配置,生成 compiler instance(编译实例)
var compiler = webpack(webpackConfig);

//使用webpack-dev-middleware插件《自动编译》
var devMiddleware = require("webpack-dev-middleware")(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

//注册到express服务
app.use(devMiddleware);
//引入热更新插件《自动刷新》
var hotMiddleware = require("webpack-hot-middleware")(compiler);
app.use(hotMiddleware);


//监听html文件改变事件
compiler.plugin("compilation", function (compilation) {
    compilation.plugin("html-webpack-plugin-after-emit", function (data, cb) {
        //发布reload事件,在dev-client.js监听
        hotMiddleware.publish({ action: "reload" });
        cb();
    })
});

//使用静态资源
app.use(express.static(__dirname + "/"));
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("Listenint at http://localhost:" + port + "\n");
});