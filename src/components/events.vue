<template>
  <div class="container">
    <header class="jumbotron" v-if="!add">
      <h1><span class="glyphicon glyphicon-tent"></span> Group 3 Web Server</h1>
      <p class="lead">Sharing your problem with best doctors secretly</p>
      <a class="btn btn-primary btn-lg" role="button" v-on:click = "add = !add">Share Your Problem</a>
    </header>

    <header class="jumbotron" v-else>
      <div class="form-group">
        <input class="form-control" type="text" placeholder="name" v-model="newPost.name">
      </div>
      <div class="form-group">
        <input class="form-control" type="text" placeholder="image url" v-model="newPost.image">
      </div>
      <div class="form-group">
        <textarea placeholder="Description" class="form-control" rows="3" v-model="newPost.description" required></textarea>
      </div>
      <input class=" btn btn-primary btn-block" type="submit" value ="submit" v-on:click = "sumit()">
      <p v-if="empty">can not be empty</p>
    </header>

 <!--   <dl class="list_dl">
<dt><b>Past Posts</b><a class="more">>>more</a></dt>
<dd>


<ul v-for="(post,index) in posts.posts">
<li><span>{{post.update_at}}</span><a class="link1" >{{post.author.username}}</a> 
  <a v-on:click="showD(index)">{{post}}</a>
</li>
</ul>


</dd>
</dl> -->

<div class="row text-center" >
  <div v-for="(post, index) in posts.posts" style="flex-wrap:wrap ">
        <div class="col-md-3 col-sm-6 col-12" style="display:flex;">
            <div class="thumbnail">
                 <img class="img-responsive here" :src="post.image" :onerror="url" height="350" width="350">
                <div class="caption">
                        <h4>{{post.name}}</h4>                  
                </div>
                <p>
                    <a class="btn btn-primary" v-on:click="showD(index)">More Info</a>
                </p>
            </div>
        </div>
  </div>
</div>



  </div>
</template>

<script>
import {eventBus} from '../main'
import headBar from './headBar'
export default {

  name: 'events',

  created(){
    if(this.username ==="")
    this.username=this.$route.params.username;
    this.$http.get('/api/user/info/'+this.username)
              .then(res => {
                if(typeof(res.data) != "object"){
                   this.$router.push('/login');
                }else{
                   eventBus.$emit("logged-in",this.username);
                   this.user = res.data;
                   //console.log(res.data);
                }
              });
    this.$http.get('/api/posts')
              .then(res =>{
                   this.posts.posts = res.data.data;
              });
  },

  data () {
    return {
          test:"",
          url:'this.src="' + "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzToxjKgvBvrX_eshC4W-JEvEIX9Bvcllm70v4B5fJIi5Gf7BF" + '"',
          newPost: {
              name:"",
              image:"",
              description:""
          },
          username : "",
          user:{},
          posts:{
            posts:[]
          },
          add : false,
          empty: false
    }
  },
  methods:{
     showD(index){
      var id = this.posts.posts[index]._id;
      this.$router.push('/post/'+id);
    },
    sumit(){
      var self = this;
      if(this.newPost.name == "" || this.newPost.description == ""){
          this.empty = true;
      }else{
          this.$http.post('/api/posts',this.newPost)
          .then(res =>{
              if(res.data.message == "New post created"){
                self.$http.get('/api/posts')
                .then(res =>{
                  self.posts.posts = res.data.data;
                });
                self.add = !self.add;
                self.newPost = {
                  name:"",
                  image:"",
                  description:""
                };
                self.empty = false;
              }else{
                console.log("post add error");
                self.newPost = {
                  name:"",
                  image:"",
                  description:""
                };
                self.add = !self.add;
                self.empty = false;
              }
          });
      }
      
    }
  },
  components:{
  	headBar: headBar
  }
}
</script>

<style lang="css" scoped>
.here{
   display: inline-block;
    width: 250px;
    height: 250px;
    overflow: hidden;
}

a:hover{
  cursor:pointer
}
ul,li,ol,dl,dt,dd{
 padding:0px;
 margin:0px;
 list-style-type: none;
}
a{ text-decoration: none;}
.list_dl{
 width:100%;
 height:auto;
 display:block;
 overflow:hidden;
 margin-bottom:8px;
 font-size:10pt;
}
.list_dl dt{
 width:100%;
 height:24px;
 margin-bottom:1px;
 background-color:#42a4f4;
 border-bottom-width: 2px;
 border-bottom-style: solid;
 border-bottom-color: #FF9933;
 background-repeat:repeat-x;
 background-position: right top;
}
.list_dl dt b{float:left;
 width:240px;
 height:24px;
 line-height:24px;
 display:block;
 color:#FFFFFF;
 margin-left:12px;}
.list_dl dt a{
 width:5em;
 height:23px;
 display:block;
 line-height:23px;
 margin-top:1px;
 color:#FFFFFF;
 float:right;
 text-align:right;
 padding-right:10px;}
.list_dl dt a.more{
 color:#C1CEDB;}
.list_dl dt a.more:hover{
color:#fff;
}
.list_dl dd{
display:block;
margin-top:4px;
clear:both;}
.list_dl ul li{
 text-align:left;
 text-indent: 1.3em;
 line-height:220%;
 border-bottom-width: 1px;
 border-bottom-style: dashed;
 border-bottom-color: #CCCCCC;
 background-repeat:no-repeat;
 background-position: 4px center;
}
a.link1{color:#797979;}
.list_dl ul li span{
 float:right;
 color:#9B9B9B;
 margin-right:7px;
}
h3{
  text-align: center;
}
hr{
  margin-bottom: 10px;
}
</style>