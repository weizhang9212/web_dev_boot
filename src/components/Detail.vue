<template>
	<div class="container">
		<div class="row">
			<div class="col-md-5">
				<p class="lead">{{user.username}}'s Problem</p>
				<div class="list-group">
					<li class="list-group-item active">
						Statue
					</li>
					<hr>

					<div v-for="statu in statue">
						<li class="list-group-item">
							{{statu.state}}
						</li>
					</div>
					<div v-if="isAuthor">
						<div class="text-right">
							<a class="btn btn-success" v-on:click="addState =!addState">Add State</a>
						</div>
						<hr>
						<div v-if="addState">
							<div class="form-group">
								<input class="form-control" type="text" placeholder="State" v-model="newState.state">
							</div>
							<div class="text-right">
								<a class="btn btn-success" v-on:click="addNewState">Add !</a>
							</div>
						</div>	
					</div>
				</div>
				<div id="map"></div>
			</div>
			<div class="col-md-7">
				<div class="thumbnail">
					<img class="img-responsive" :src="url" :onerror="urlDefault" >
					<div class="caption">
						<h4><a>{{post.name}}</a></h4>
						<p>{{post.description}}</p>
						<p><em>Submitted By </em><strong><a>{{user.username}}</a>, {{fromNow}}</strong></p>
						<div v-if="isAuthor">
						  <input class="btn btn-xs btn-danger " style="margin-left: 3px;" type="submit" value="Delete">
                          <!-- <a class="btn btn-xs btn-warning" >Edit</a>	 -->	
						</div>
					</div>
				</div>
            
				<div class="well">
					<div class="text-right">
						<a class="btn btn-success" v-on:click="addComment =!addComment">Add Comment</a>
					</div>
					<hr>
					<div v-if="addComment">
						<div class="form-group">
							<input class="form-control" type="text" placeholder="Comment" v-model="newComment.text">
						</div>
						<div class="text-right">
							<a class="btn btn-success" v-on:click="addNewComent">Add !</a>
						</div>
					</div>
					<div class="row" v-for="comment in comments.comments">
						<div class="col-md-12">
							<tr><td class="klytd">Time : </td><td class="hvttd">{{comment.createdAt}}</td></tr>  
							<tr><td class="klytd">Author:</td><td class ="hvttd">{{comment.author.username}}</td></tr> 
							<tr><td class="klytd">Message：</td><td class ="hvttd">{{comment.text}}</td></tr> 
							<hr> 
						</div>
					</div>

            <!-- <% campground.comments.forEach(function(comment) { %>

                <div class="row">
                    <div class="col-md-12">
                        <strong> <%= comment.author.username %> </strong>
                        <span class="pull-right"><%= moment(campground.createdAt).fromNow() %></span>
                        <p><%= comment.text %></p>
                        <% if (currentUser && comment.author.id.equals(currentUser._id) || currentUser && currentUser.isAdmin) {%>
                            <form class="delete-form" action="/campgrounds/<%= campground._id%>/comments/<%= comment._id%>?_method=DELETE" method="POST">
                                <input class="btn btn-xs btn-danger pull-right" style="margin-left: 3px;" type="submit" value="Delete">
                            </form>
                            <a class="btn btn-xs btn-warning pull-right" href= "/campgrounds/<%= campground._id%>/comments/<%= comment._id%>/edit">Edit</a>
                        <% }%>
                    </div>
                </div>
                <% }) %>  -->

            </div>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment'
export default {

	name: 'Detail',
	created(){
		var self = this;
		this.$http.get('/api/getUser')
		.then(res => {
			self.patient = res.data.username;
		});
		//console.log(1);
		var id = this.$route.params.id;
		this.$http.get('/api/posts/'+id)
		.then(post => {
			self.post = post.data.post;
			self.url = post.data.post.image;
			self.user = post.data.post.author;
			self.statue = post.data.post.states;
			self.comments.comments = post.data.post.comments;
			console.log(self.comments.comments);
			if(self.patient == self.user.username){
				self.isAuthor = true;
			}
			console.log(self.post);
		});
	},
	data () {
		return {
			addState : false,
			patient:"",
			newComment:{
				text:""
			},
			newState:{
				state:""
			},
			comments:{
				comments:[]
			},
			statue:{
				statue:[]
			},
			post:{},
			user:{},
			url :"",
			urlDefault:'this.src="' + "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzToxjKgvBvrX_eshC4W-JEvEIX9Bvcllm70v4B5fJIi5Gf7BF" + '"',
			addComment:false,
			isAuthor:false

		}
	},
	computed: {
		fromNow: function () {
			return moment(this.post.created_at).fromNow();
		}
	},
	methods:{
			addNewComent(){
				var self = this;
				var id = this.$route.params.id;
				this.$http.post('/api/posts/'+id+'/comments',self.newComment)
				.then(res =>{
					if(res.data.message == "You need to be logged in to do that!"){
						return self.$router.push('/login');
					}
					self.newComment.text = "";
					self.addComment = false;
				})
				.then(res =>{
					this.$http.get('/api/posts/'+id)
					.then(post => {
						self.post = post.data.post;
						self.url = post.data.post.image;
						self.user = post.data.post.author;
						self.statue = post.data.post.states;
						self.comments.comments = post.data.post.comments;
					});
				});

			},
			addNewState(){
				var id = this.$route.params.id;
				var self = this;
				this.$http.post('api/posts/'+id+'/states',self.newState)
				.then(res =>{
					//console.log(res);
				})
				.then(res => {
					var id = self.$route.params.id;
					self.$http.get('/api/posts/'+id)
					.then(post => {
						self.post = post.data.post;
						self.url = post.data.post.image;
						self.user = post.data.post.author;
						self.statue = post.data.post.states;
						self.comments.comments = post.data.post.comments;
						//console.log(self.user);
						if(self.patient == self.user.username){
							self.isAuthor = true;
						}
						self.addState = false;
						self.newState.state = "";
						//console.log(self.post);
					});
				    });
			}
		}

}
</script>

<style lang="css" scoped>

</style>