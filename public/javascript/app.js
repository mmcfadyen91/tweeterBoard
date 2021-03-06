var app = angular.module('app',['ngRoute']);

app.config( function($routeProvider) {
	$routeProvider
	.when("/", { controller: "PostsCtrl", templateUrl: "posts.html"})
	.when("/register", { controller: "RegisterCtrl", templateUrl: "register.html"})
	.when("/login", { controller: "LoginCtrl", templateUrl: "login.html"});
});

app.service("PostsSvc", function($http) {

	this.fetch = function() {
		return $http.get('/api/posts');
	};

	this.create = function(post) {
		return $http.post('/api/posts', post);
	};
});

app.controller('PostsCtrl', function($scope, PostsSvc){

	$scope.addPost = function(){

		if ($scope.postBody) {

			PostsSvc.create({
				username: 'dev',
				body: $scope.postBody
			}).success(function (post) {
				$scope.posts.unshift(post);
				$scope.postBody = null;
			}).error(function(err){
				console.log(err);
			});
		}
	};

	PostsSvc.fetch().success(function (posts){
		$scope.posts = posts;
	});

});

app.service("UserSvc", function($http){
	var svc = this;
	svc.getUser = function() {
		return $http.get('/api/users', {
			headers: {'X-Auth': this.token}
		});
	};
	svc.login = function(username, password) {
		return $http.post('/api/session', {
			username: username,
			password: password
		}).then(function(val){
			svc.token = val.data;
			return svc.getUser();
		});
	};
	svc.createUser = function(username, password) {
		return $http.post('/api/users', {
			username: username,
			password: password
		});
	};
});

app.controller('LoginCtrl', function($scope, UserSvc){
	$scope.login = function (username, password){
		UserSvc.login(username, password)
		.then(function(user){
			console.log(user);
		});
	};
});


app.controller('RegisterCtrl', function($scope, UserSvc){
	$scope.register = function (username, email, password, confirmpassword){
		console.log("register:", username, password);
		if (password === confirmpassword){
			UserSvc.createUser(username, password)
			.then(function(user){
				console.log("created user: ", user);
			});
		}
	};
});
