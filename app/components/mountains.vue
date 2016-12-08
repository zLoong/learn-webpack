<template>
    <ul>
        <li v-for="v in list" v-text="v"></li>
    </ul>
</template>
<style>
    ul {
        width: 100%;
        margin: 0 auto;
        text-align: center;
        list-style: none;
    }
    
    li {
        padding: 10px 0;
        margin: 6px 0;
        background: #efefef;
        -webkit-transition: all .3s;
    }
    
    li:hover {
        background: #ccc;
    }
</style>
<script>
export default {
    data () {
        return {
        list: ["恒山", "衡山", "华山", "泰山", "嵩山高"]
        }
    }
}
</script>