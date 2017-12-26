<template>
	<div id="login">
   <div class="container">
    <div class="raw login-register">
      <form>
        <label>Login</label>
        <div class="form-group">
          <input class="form-control" type="text"  placeholder="Username" v-model="user.username">
        </div>
        <div class="form-group">
          <input class="form-control" type="PassWord" placeholder="PassWord" v-model="user.password">
        </div>
        <p v-if="admin">User name or password is Uncorrect!</p>
        <button class="btn btn-primary" @click.prevent = "regist()">New User</button>
        <button class="btn btn-success" @click.prevent = "Login()">Login</button>
      <!-- <button class="btn btn-default" @click.prevent = "test()">test</button>
        <button class="btn btn-default" @click.prevent = "logout()">logout</button> -->
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { AES, enc } from 'crypto-js'
import client from '../../assets/js/client'
import {eventBus} from '../../main'
import headBar from '../headBar.vue'
export default {

  name: 'login',
  created(){
    this.$http.get('/api/getKey')
        .then(res =>{
          this.RSAkey = res.data;
          console.log('The RSA key we got from server is: ' +this.RSAkey);
        });
  },
  data () {
    return {
      RSAkey:"",
    	admin:false,
        user:{
        	username:"",
        	password:""
        }
    }
  },
  methods:{
  	regist(){
  		this.$router.push('/register');
  	},
  	Login(){
      var text = {
        username:"",
        password:""
      };
      var self = this;
      var random = Math.floor(Math.random()*10000).toString();
      console.log('The AES key the client generate is: '+random);
      text.username = AES.encrypt(this.user.username,random).toString();
      text.password = AES.encrypt(this.user.password,random).toString();
      text.AES= client.encryptRSA(random,this.RSAkey);
      console.log(text);
  		this.$http.post('/api/login', text)
  		.then(res =>{
            if(res.data.right){
            	eventBus.$emit("logged-in",this.user.username);
            	var username = this.user.username;
            	this.$router.push('/user/'+username);
            	this.admin = false;
            }         
  		});
  		this.admin = true;
  	},
  	test(){
  		this.$http.get('/api/user/user/ma')
  		.then(res =>{
  			console.log(res);
  		});
  	},
  	logout(){
  		eventBus.$emit("logout",this.user.username);
  		this.$http.get('/api/logout')
  		.then(res =>{
  			console.log(res);
  		});
  	}
  },
  components:{
  	"head-bar" : headBar
  }
}
</script>

<style lang="css" scoped>
#login{
	text-align: center;
}
.login-register{
  width: 60%;
    max-width: 380px;
    margin: 25px auto;

}
</style>