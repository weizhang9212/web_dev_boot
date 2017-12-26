<template>
	<div>
		<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 ">
			<div id="carousel-slider" data-ride="carousel" class="carousel slide">

				<div class="carousel-inner">
					<div class="item active">
						<h1> Secure Web Server  </h1>
					</div>
					<div class="item">
						<h1> 644 Final Project </h1>
					</div>
					<div class="item">
						<h1>  Group Five </h1>
					</div>
				</div>
				<!--INDICATORS-->
			</div>
			<ol class="carousel-indicators">
				<li data-target="#carousel-slider" data-slide-to="0" 
				v-on:click = "setButton(0)"
				v-bind:class="{active:isActive[0]}"></li>
				<li data-target="#carousel-slider" data-slide-to="1" 
				v-on:click = "setButton(1)"
				v-bind:class="{active:isActive[1]}"></li>
				<li data-target="#carousel-slider" data-slide-to="2" 
				v-bind:class="{active:isActive[2]}"
				v-on:click = "setButton(2)"></li>
			</ol>


		</div>
	</div>
</template>

<script>
import '../../assets/plugins/jquery.easing.min.js'

var slides = [[true,false,false],[false,true,false],[false,false,true]];
export default {

  name: 'sliding',

  data () {
    return {
        isActive:[true,false,false]
    };
  },

  methods : {
     setButton(index){
     	var tmp = [];
     	for(let i = 0 ; i < 3 ; i++){
     		if(i == index) tmp[i] = true;
     		else tmp[i] =false;
     	}
     	this.isActive = tmp ;
     }
  },
};
</script>

<style lang="css" scoped>
</style>