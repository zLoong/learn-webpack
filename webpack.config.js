var path=require("path");

module.exports={
    entry:{
        app:path.resolve(__dirname,"./app/main.js")
    },
    output:{
        path:path.resolve(__dirname,"./output/static"),
        publicPath:"static/",
        filename:"[name].js"
    },
    resolve:{
        root:__dirname,
        extensions:["",".js",".jsx",".vue"]
    },
    module:{
        loaders:[
            {test:/\.vue$/,loader:"vue"},
            {test:/\.js$/,loader:"babel",query:{presets:["es2015"]},include:"/",exclude:/node_modules/}
        ]
    },
    plugins:[]
};