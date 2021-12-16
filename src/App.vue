<template>
  <div >
    <Header></Header>
    <Corp></Corp>
    <Footer/>
  </div>
</template>

<script>
import Header from './layout/Header.vue'
import Corp from './layout/Corp.vue'
import Footer from './layout/Footer.vue'
export default {
  components: { Header ,Corp,Footer},
  name: 'App',
}
</script>

<style>

</style>
