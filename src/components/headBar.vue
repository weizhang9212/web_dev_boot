<template>
	<div>
     <nav class="navbar navbar-default">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Web Server</a>
        </div>
    
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
              <li class=""><a href="/campgrounds">Home</a></li>
            </ul>
          <ul class="nav navbar-nav navbar-right">
              <li class="">
                <a v-if="!logged" v-on:click="login">
                  Login
                  <i class="fa fa-user" aria-hidden="true"></i>
                </a>
              </li>
              <li class="">
                <a v-on:click="signup">
                  Sign Up
                  <i class="fa fa-user-plus" aria-hidden="true"></i>
                </a>
              </li>

                <li><a v-if="logged">Administrator: {{user}}</a></li>
              <li><a v-on:click="logout">Logout</a></li>
            
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
		<!-- <nav class="navbar navbar-default narbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">Secure Web</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right" v-if="!logged">
                        <li><a v-on:click="signup">Sign Up</a></li> 
                </ul>
                <ul class="nav navbar-nav navbar-right" v-if="logged">
                  
                        <li><a>{{user}}</a></li>
                        <li><a v-on:click="logout">Log Out</a></li> 
                </ul>
            </div>
        </div>
    </nav> -->
	</div>
</template>

<script>
import {eventBus} from '../main'
export default {

  name: 'headBar',

  props:["username","log"],
  
  data () {
    return {
         logged: false,
         user:""
    };
  },
  created(){
    eventBus.$on("logged-in",(user) =>{
       this.logged = true;
       this.user = user;
    });
  },
  methods:{
    login(){
      this.$router.push('/login');
    },
    logout(){
        this.logged = false;
        this.user = "";
        var self = this;
        this.$http.get('/api/logout')
            .then(res =>{
              self.$router.push('/');
            });
    },
    signup(){
        this.$router.push('/register')
    }
  }
};
</script>

<style lang="css" scoped>
a:hover{
  cursor:pointer
}
</style>