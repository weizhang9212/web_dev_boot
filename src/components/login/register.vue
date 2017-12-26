<template>
  <div class="container">
	<div class="row">
    <h1 style="text-align: center">Sign Up</h1>
    <div class="login-register">
            <div class="form-group">
                <input class="form-control" type="text" placeholder="username" v-model="user.username">
            </div>
            <div class="form-group">
                <input class="form-control" type="password" placeholder="password" v-model="user.password">
            </div>
            <div class="form-group">
                <input class="form-control" type="email"  placeholder="abc@abc.com" v-model="user.email">
            </div>
            <div class="form-group">
                <input class="form-control" type="text"  placeholder="Avatar" v-model="user.avatar">
            </div>
            <label><input type="radio" value = "User" v-model="user.type" />User </label> 
            <label><input type="radio" value = "Doctor" v-model="user.type" />Doctor </label> 
            <label><input type="radio" value = "Admin" v-model="user.type" />Admin </label> 
            <div class="form-group">
                <input class="form-control" type="password"  placeholder="admin code" v-model="user.admin">
            </div>
            <div class="form-group">
                <button class="btn btn-lg btn-primary btn-block" v-on:click="register()">Sign Up!</button>
            </div>
        <a href="/">Go Back</a>
    </div>
  </div>
</div>
</template>

<script>
import { AES, enc } from 'crypto-js'
import client from '../../assets/js/client'
import {eventBus} from '../../main'
export default {

  name: 'register',
  created(){
    this.$http.get('/api/getKey')
        .then(res =>{
          this.RSAkey = res.data;
          console.log(this.RSAkey);
        });
  },
  data () {
    return {
        RSAkey:"",
        user:{
        	username:"",
        	password:"",
          email:"",
          avatar:"",
          type:"",
          admin:""
        }
    }
  },
  methods:{
  	register(){
      var users = {
          username:"",
          password:"",
          email:"",
          avatar:"",
          type:"",
          AES:"",
          adminCode:""
      }
      var self = this;
      var random = Math.floor(Math.random()*10000).toString();
      users.AES= client.encryptRSA(random,this.RSAkey);
      users.username = AES.encrypt(this.user.username,random).toString();
      users.password = AES.encrypt(this.user.password,random).toString();
      users.email = AES.encrypt(this.user.email,random).toString();
      users.avatar = AES.encrypt(this.user.avatar,random).toString();
      users.type = this.user.type;
      users.adminCode = AES.encrypt(this.user.admin,random).toString();
      console.log('The AES key client generated is: '+random);
      console.log('The RSA key we got from server is: ' + this.RSAkey);
      console.log(users);

  		this.$http.post('/api/register', users)
  		.then(res => {
  			console.log(res);
              if(res.data.right){
              	//console.log("1");
                //eventBus.$emit("logged-in",this.user.username);
              var username = this.user.username;
              this.$router.push('/user/'+username);
              }else{
              	console.log("2");
              }
  		});
  	}
  }
}
</script>

<style lang="css" scoped>
.login-register{
  width: 60%;
    max-width: 380px;
    margin: 25px auto;

}
</style>