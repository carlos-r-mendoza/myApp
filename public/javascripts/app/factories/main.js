'use strict';

app.factory('APIConfig', [function() {
	
	return {
		devRoot: 'http://jsonplaceholder.typicode.com',
		prodRoot: '',
		env: 'dev',
		setEnv: function() {

		},
		getRoot: function() {
			if(this.env === 'dev') { //this object
				return this.devRoot;
			} else if (this.env === 'prod') {
				return this.prodRoot;
			}
		}
	}
}]);

app.factory('Users', ['$http', 'APIConfig', function($http, APIConfig) {
	
	return {
		//gets all users		
		get: function() {
			return $http.get(APIConfig.getRoot() + '/users')
					.then(function(response){
						return response.data;
					})
		}
	};	
}]);

app.factory('Posts', ['$http', 'APIConfig', function($http, APIConfig) {
	
	return {
		//gets all posts
		get: function() {
			return $http.get(APIConfig.getRoot() + '/posts')
					.then(function(response){
						return response.data;
					});
		},
		//gets user's posts using user.id
		getByUserId: function(userId) {
			console.log('id', userId)
			return $http.get(APIConfig.getRoot() + '/posts?userId=' + userId)
					.then(function(response){
						console.log('fad',response.data)
						return response.data;
					});
		}
	};
}]);

app.factory('Comments', ['$http', 'APIConfig', function($http, APIConfig) {
	
	return {
		//gets all comments
		get: function() {
			return $http.get(APIConfig.getRoot() + '/comments/')
					.then(function(response){
						return response.data;
					})
		},
		//gets post's comments using post.id
		getByPostId: function(postId) {
			return $http.get(APIConfig.getRoot() + '/comments?postId=' + postId)
					.then(function(response){
						return response.data;
					})			
		}
	}
}]);

app.factory('ToDo', ['$http', 'APIConfig', function($http, APIConfig) {
	
	return {
		//gets all todos
		get: function() {
			return $http.get(APIConfig.getRoot() + '/todos/')
					.then(function(response){
						return response.data;
					})
		},
		//gets todo list by user id
		getByUserId: function(userId) {
			return $http.get(APIConfig.getRoot() + '/users/' + userId + '/todos')
					.then(function(response){
						return response.data;
					})			
		}
	}
}]);

app.factory('Auth', ['$http', function($http) {

	return {
		//gets current authenticated user's info
		getUserInfo: function() {
			return $http.get('/authenticatedUserInfo')
					.then(function(response){
						console.log('this is the authenticated', response)
						return response.data;
					});
		}
	};
}]);

app.factory('States', ['$http', function($http) {

	var states = ['AL - Alabama',
		'AK - Alaska',
		'AZ - Arizona',
		'AR - Arkansas',
		'CA - California',
		'CO - Colorado',
		'CT - Connecticut',
		'DC - District of Columbia',
		'DE - Delaware',
		'FL - Florida',
		'GA - Georgia',
		'HI - Hawaii',
		'ID - Idaho',
		'IL - Illinois',
		'IN - Indiana',
		'IA - Iowa',
		'KS - Kansas',
		'KY - Kentucky',
		'LA - Louisiana',
		'ME - Maine',
		'MD - Maryland',
		'MA - Massachusetts',
		'MI - Michigan',
		'MN - Minnesota',
		'MS - Mississippi',
		'MO - Missouri',
		'MT - Montana',
		'NE - Nebraska',
		'NV - Nevada',
		'NH - New Hampshire',
		'NJ - New Jersey',
		'NM - New Mexico',
		'NY - New York',
		'NC - North Carolina',
		'ND - North Dakota',
		'OH - Ohio',
		'OK - Oklahoma',
		'PA - Pennsylvania',
		'RI - Rhode Island',
		'SC - South Carolina',
		'SD - South Dakota',
		'TN - Tennessee',
		'TX - Texas',
		'UT - Utah',
		'VT - Vermont',
		'VA - Virginia',
		'WA - Washington',
		'WV - West Virginia',
		'WI - Wisconsin',
		'WY - Wyoming'];


	return {

		get: function() {
			return states;
		},
		getCitiesOfState: function(stateName) {
			return $http.get('/get-cities-in-state/' + stateName)
				.then(function(response){
					return response.data;
				});
		},
		verifyZipCode: function(zipCode) {
			return $http.get('/verify-zipcode/' + zipCode)
				.then(function(response){
					return response.data;
				});
		}

	}

}]);

app.factory('NewUser', ['$http', function($http) {

	var user = {
		username: null,
		password: null,
		id: null,
		firstName: null,
		lastName: null,
		phone: null,
		email: null,
		address: {
			address1: null,
			address2: null,
			city: null,
			state: null,
			zipCode: null
		},
		income: {
			salary: null,
			checking: null,
			savings: null
		},
		cosigner: {
			firstName: null,
			lastName: null,
			phone: null,
			email: null
		},
		accountApproved: false
	};

	return {

		get: function() {
			return user;
		},
		create: function() {
			return user;
		},
		update: function(newUser) {
			user.username = newUser.username;
			user.password = newUser.password;
		},
		// checks to see if username is available
		verifyUsername: function(username) {
			return $http.post('/verify-username', { username: username })
				.then(function(response) {
					return response.data;
				})
		},
		// checks to see if income is eligible
		verifyIncome: function(assets) {
			return $http.post('/verify-income', { assets: assets })
				.then(function(response) {
					return response.data;
				}); 
		}
	}

}]);


