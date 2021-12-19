<template>
    <at-input  placeholder="请输入内容" append-button v-model="keyWords" @input="antiShake" @keyup.enter="antiShake">
        <template slot="append">
            <i class="icon icon-search" @click.once="searchKeywords"></i>
        </template>
    </at-input>
</template>

<script>
import {_search} from '../../api/found'
export default {
    data(){
        return{
            keyWords:'',
            timer:null,
        }
    },
    methods:{
        antiShake(){
            const that = this
            //触发input事件 先清除定时器 重新打开一个定时器
            clearTimeout(this.timer);
            that.timer = setTimeout(()=>{
                that.searchKeywords(that.keyWords)
            },700)
        },
        ValidataInput(value){
           if(value.length) return true
           return false
        },
        async searchKeywords(keyWords){
           if(!this.ValidataInput(keyWords)) return
            const {data:res} = await _search(keyWords)
            console.log(res);
        },
    }
}
</script>

<style>

</style>