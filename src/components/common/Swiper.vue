<template>
    <el-carousel :interval="3000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in banner" :key="index">
        <img :src="item.imageUrl+'?param200y200' " alt="">
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    props:['banner']
}
</script>

<style scoped>
img{
    width: 536px !important;
}

</style>