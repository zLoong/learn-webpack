var express = require("express");
var app = express();
var port = process.env.port || 3000;

/*
*引入webpack及其配置config
*/
var webpack=require("webpack");
var webpackConfig=require("./webpack.config");
//调用配置,生成 compiler instance(编译实例)
var compiler = webpack(webpackConfig);

//使用webpack-dev-middleware插件
var devMiddleware=require("webpack-dev-middleware")(compiler,{
    publicPath:webpackConfig.output.publicPath,
    stats:{
        colors:true,
        chunks:false
    }
});

//注册到express服务
app.use(devMiddleware);
//引入热更新插件
var hotMiddleware=require("webpack-hot-middleware")(compiler);
app.use(hotMiddleware);

//使用静态资源
app.use(express.static(__dirname + "/"));
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("Listenint at http://localhost:" + port + "\n");
});