<template>
  <div class="container">
	<form>
		<div class="form-group">
		  <label>User Name</label>
          <input type="text" name="userId" v-model="user.id">
	    </div>
	    <div class="form-group">
		  <label>PassWord</label>
          <input type="PassWord" name="passWord" v-model="user.password">
	    </div>
      <div v-if = "show" v-on:click ="show = !show">
        <div class="panel panel-primary">
           <div class="panel-heading">Protected Message</div>
             <div class="panel-body">
                {{key}}
             </div>
        </div>
      </div>
      <div v-if = "wrong">
        <div class="panel panel-danger">
           <div class="panel-heading">Alert!</div>
             <div class="panel-body">
                The message has been modified!!!
             </div>
        </div>
      </div>
	    <button class="btn btn-default" @click.prevent = "postData">post button</button>
	    <button class="btn btn-default" @click.prevent = "getData">test button</button>
	    <button class="btn btn-default" @click.prevent = "urlTest">test Url</button>
      <button class="btn btn-default" @click.prevent = "wrongTest">test Wrong</button>
      <button class="btn btn-default" @click.prevent = "AEStest">test AES</button>
	</form>
  </div>
</template>

<script>
import { AES, enc } from 'crypto-js'
import client from '../assets/js/client'
export default {

  name: 'test',

  data () {
    return {
        user:{
        	id:"",
        	password: "",
          publicKey: ""
        },
        key:"",
        show : false,
        wrong: false

    };
  },
//   mounted (){
//      var PassPhrase = "The Moon is a Harsh Mistress."; 
 
// // The length of the RSA key, in bits. 
//      var Bits = 1024; 
 
//      var RSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
//      var PublicKeyString = cryptico.publicKeyString(RSAkey);
//      this.key = PublicKeyString;
//      console.log(this.key);
//   },

  methods:{
  	getData(){
  		this.$http.get('https://project-fa5dc.firebaseio.com/data.json')
  		.then(res => {
  			for(var key in res.data){
  				console.log(res.data[key]);
  			}
  		});
  	},

  	postData(){
  		var self = this;
        this.$http.post('https://project-fa5dc.firebaseio.com/data.json', self.user)
                  .then(res => {
                  	console.log(res);
                  })
                  .catch(err =>{
                  	console.log(err);
                  });
  	},

  	urlTest(){ 
       var self = this;
       var RSAkey = client.privateKey(self.user.password,1024);
       var publicKeyString = client.publicKeyString(RSAkey);
       this.user.publicKey = publicKeyString;

       this.$http.post('/api/user/dingma', this.user)
       .then(res => {
        var text = client.decryptRSA(res.data.ciper,RSAkey);
        var digit = client.MD5(text);
        if(digit == res.data.digit){
          self.show = true;
          self.key = text;
          self.wrong = false;
          console.log("message is right");
        }else{
          self.wrong = true;
        }
       });

  	},
    wrongTest(){
      var self = this;
       var RSAkey = client.privateKey(self.user.password,1024);
       var publicKeyString = client.publicKeyString(RSAkey);
       this.user.publicKey = publicKeyString;

       this.$http.post('/api/user/dingma', this.user)
       .then(res => {
        var text = client.decryptRSA(res.data.ciper+" lol!~",RSAkey);
        var digit = client.MD5(text);
        if(digit == res.data.digit){
          self.show = true;
          self.key = text;
        }else{
          self.wrong = true;
          self.show = false;
          console.log("message has been changed");
        }
       });
    },
    AEStest(){
      var self = this;
       var RSAkey = client.privateKey(self.user.password,1024);
       var publicKeyString = client.publicKeyString(RSAkey);
       this.user.publicKey = publicKeyString;

       this.$http.post('/api/user/dingma/test', this.user)
       .then(res => {
        var key  = client.decryptRSA(res.data.ciper,RSAkey);
        var text = client.decryptAES(res.data.cipherText,key);
        var digit = client.MD5(text);
        if(digit == res.data.digit){
          self.show = true;
          self.key = text;
          self.wrong = false;
          console.log("message is right");
        }else{
          self.wrong = true;
        }
       });
    }
  }
};
</script>

<style lang="css" scoped>
</style>