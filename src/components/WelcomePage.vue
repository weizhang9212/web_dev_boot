<template>
	<div class=" home">
  <!--           <head-bar></head-bar> -->
            <home></home>
	</div>
</template>

<script>
import Home from './home.vue'
import headBar from './headBar'
//import '../../static/js/custom'
export default {

  name: 'WelcomePage',

  data () {
    return {
    }
  },
  components:{
  	home : Home,
  	headBar: headBar
  }
}
</script>

<style lang="css" scoped>
.home{
}
.box{
   border : solid gray 1px;
}
</style>