// var Hello=require("./modules/hello");
// document.write(Hello);


import Vue from "vue";
import Mountain from "./components/mountains.vue";

new Vue({
    el: "body",
    components: {
        Mountain
    }
})