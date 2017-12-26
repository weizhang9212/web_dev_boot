<template>
		<div id="back">
			<div id="landing-header">
				<h1>Welcome to Our Health Care Service!</h1>
				<span id="group">Group Three</span>
				<hr>
				<!-- <a href="/campgrounds" class="btn btn-lg btn-success">View All Campgrounds</a> -->
				<router-link to="/login" class="btn btn-lg btn-success">
					</i> Log In </i>
				</router-link>
			</div>

			<ul class="slideshow">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>

			</div>
		<!-- <div id="home" >
				<div class="container">
					<div class="row">
                       <slide-bar></slide-bar>
					</div>
					<div class="row">
						<div class="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2  scrollclass">
							<p >
								This is a Secure Health Care Website
								Adding contents
							</p>
							<br/>
							<router-link to="/login" class="btn btn-lg custom-btn-1"><i class="fa fa-globe" >				</i> Log In </i>
							</router-link>
						</div>
					</div>
				</div>

			</div>
			<hr id="home">
			<about></about> -->
</template>

<script>
import about from './home_detail/about.vue'
import slideBar from './home_detail/sliding.vue'
export default {

  name: 'home',

  data () {
    return {

    };
  },
  components: {
  	slideBar : slideBar,
  	about : about
  }
};
</script>

<style lang="css" scoped>
#group{
	color:white;
	font-size: 22px;
	top:100%;
	left : 100%;
}
#id{
	height: 100%; width: 100%;
    background-color: #000;
}

#landing-header {
  z-index: 1;
  position: relative;
  text-align: center;
  padding-top: 40vh;
  text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
				       0px 8px 13px rgba(0,0,0,0.1),
				       0px 18px 23px rgba(0,0,0,0.1);
}

#landing-header h1 {
  color: #fff;
}

.slideshow { 
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  list-style: none;
  margin: 0;
  padding: 0;
}

.slideshow li { 
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  opacity: 0;
  z-index: 0;
  animation: imageAnimation 50s linear infinite; 
}

.slideshow li:nth-child(1) { 
  background-image: url(https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1050&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D) 
}
.slideshow li:nth-child(2) { 
  background-image: url(https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1051&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D);
  animation-delay: 10s; 
}
.slideshow li:nth-child(3) { 
  background-image: url(https://images.unsplash.com/photo-1493690283958-32df2c86326e?auto=format&fit=crop&w=1048&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D);
  animation-delay: 20s; 
}
.slideshow li:nth-child(4) { 
  background-image: url(https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?auto=format&fit=crop&w=1650&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D);
  animation-delay: 30s; 
}
.slideshow li:nth-child(5) { 
  background-image: url(https://images.unsplash.com/photo-1490006043117-7d3126a1c887?auto=format&fit=crop&w=1650&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D);
  animation-delay: 40s; 
}

@keyframes imageAnimation { 
  0% { 
    opacity: 0; 
    animation-timing-function: ease-in;
  }
  10% {
    opacity: 1;
    animation-timing-function: ease-out;
  }
  20% {
    opacity: 1
  }
  30% {
    opacity: 0
  }
}

hr {
	width: 400px;
	border-top: 1px solid #f8f8f8;
	border-bottom: 1px solid rgba(0,0,0,0.2);
}

.no-cssanimations .slideshow li {
	opacity: 1;
}
</style>