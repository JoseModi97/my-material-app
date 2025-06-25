angular.module('myApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/get', {
                templateUrl: 'get-view.html',
                controller: 'MainController',
                controllerAs: 'ctrl'
            })
            .when('/post', {
                templateUrl: 'post-view.html',
                controller: 'MainController',
                controllerAs: 'ctrl'
            })
            .when('/put', {
                templateUrl: 'put-view.html',
                controller: 'MainController',
                controllerAs: 'ctrl'
            })
            .when('/delete', {
                templateUrl: 'delete-view.html',
                controller: 'MainController',
                controllerAs: 'ctrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .controller('MainController', ['$http', '$location', function($http, $location) {
        var vm = this;
        vm.apiUrl = 'https://jsonplaceholder.typicode.com';

        // --- GET View Variables ---
        vm.allPosts = [];
        vm.singlePost = null;
        vm.postIdToFetch = null;
        vm.allPostsError = '';
        vm.singlePostError = '';

        // --- POST View Variables ---
        vm.newPostData = { title: '', body: '', userId: null };
        vm.createPostStatus = '';
        vm.createPostError = false;
        vm.createdPostData = null;

        // --- PUT View Variables ---
        vm.updatePostData = { id: null, title: '', body: '', userId: null };
        vm.fetchForUpdateError = '';
        vm.updatePostStatus = '';
        vm.updatePostError = false;
        vm.updatedPostResponseData = null;

        // --- DELETE View Variables ---
        vm.postIdToDelete = null;
        vm.deletePostStatus = '';
        vm.deletePostError = false;
        vm.deletedPostResponseData = null;
        vm.allPostsForDelete = [];
        vm.allPostsForDeleteError = '';


        // === GET Request Functions ===
        vm.getAllPosts = function() {
            vm.allPostsError = '';
            vm.allPosts = [];
            $http.get(vm.apiUrl + '/posts')
                .then(function(response) {
                    vm.allPosts = response.data;
                    console.log("GET all posts successful:", response.data);
                })
                .catch(function(error) {
                    vm.allPostsError = 'Failed to fetch all posts: ' + (error.statusText || 'Unknown error');
                    console.error("GET all posts error:", error);
                });
        };

        vm.getPostById = function(postId) {
            if (!postId) {
                vm.singlePostError = 'Please enter a Post ID.';
                return;
            }
            vm.singlePostError = '';
            vm.singlePost = null;
            $http.get(vm.apiUrl + '/posts/' + postId)
                .then(function(response) {
                    vm.singlePost = response.data;
                    console.log("GET post by ID successful:", response.data);
                })
                .catch(function(error) {
                    vm.singlePostError = 'Failed to fetch post ' + postId + ': ' + (error.statusText || 'Unknown error');
                    console.error("GET post by ID error:", error);
                });
        };

        // === POST Request Functions ===
        vm.submitNewPost = function(isValid) {
            if (!isValid) {
                vm.createPostStatus = 'Please fill in all required fields.';
                vm.createPostError = true;
                return;
            }
            vm.createPostStatus = '';
            vm.createPostError = false;
            vm.createdPostData = null;

            $http.post(vm.apiUrl + '/posts', vm.newPostData)
                .then(function(response) {
                    vm.createdPostData = response.data;
                    vm.createPostStatus = 'Post created successfully (simulated)! ID: ' + response.data.id;
                    console.log("POST request successful (simulated):", response.data);
                    vm.newPostData = { title: '', body: '', userId: null }; // Clear form
                    // Optionally, navigate or give other feedback
                })
                .catch(function(error) {
                    vm.createPostStatus = 'Failed to create post: ' + (error.statusText || 'Unknown error');
                    vm.createPostError = true;
                    console.error("POST request error (simulated):", error);
                });
        };

        // === PUT Request Functions ===
        vm.fetchPostForUpdate = function(postId) {
            if (!postId) {
                vm.fetchForUpdateError = 'Please enter a Post ID to fetch for update.';
                return;
            }
            vm.fetchForUpdateError = '';
            vm.updatedPostResponseData = null; // Clear previous update result
            vm.updatePostStatus = '';

            $http.get(vm.apiUrl + '/posts/' + postId)
                .then(function(response) {
                    vm.updatePostData = response.data; // Pre-fill form
                    console.log("Fetched post for update:", response.data);
                })
                .catch(function(error) {
                    vm.fetchForUpdateError = 'Failed to fetch post ' + postId + ' for update: ' + (error.statusText || 'Unknown error');
                    console.error("Fetch post for update error:", error);
                });
        };

        vm.submitUpdatePost = function(isValid) {
            if (!isValid) {
                vm.updatePostStatus = 'Please fill in all required fields.';
                vm.updatePostError = true;
                return;
            }
            if (!vm.updatePostData || !vm.updatePostData.id) {
                vm.updatePostStatus = 'No post data to update, or Post ID is missing.';
                vm.updatePostError = true;
                return;
            }
            vm.updatePostStatus = '';
            vm.updatePostError = false;
            vm.updatedPostResponseData = null;

            $http.put(vm.apiUrl + '/posts/' + vm.updatePostData.id, vm.updatePostData)
                .then(function(response) {
                    vm.updatedPostResponseData = response.data;
                    vm.updatePostStatus = 'Post ' + vm.updatePostData.id + ' updated successfully (simulated)!';
                    console.log("PUT request successful (simulated):", response.data);
                })
                .catch(function(error) {
                    vm.updatePostStatus = 'Failed to update post ' + vm.updatePostData.id + ': ' + (error.statusText || 'Unknown error');
                    vm.updatePostError = true;
                    console.error("PUT request error (simulated):", error);
                });
        };

        // === DELETE Request Functions ===
        vm.submitDeletePost = function(postId) {
            if (!postId) {
                vm.deletePostStatus = 'Please provide a Post ID to delete.';
                vm.deletePostError = true;
                return;
            }
            vm.deletePostStatus = 'Deleting post ' + postId + '...';
            vm.deletePostError = false;
            vm.deletedPostResponseData = null;

            $http.delete(vm.apiUrl + '/posts/' + postId)
                .then(function(response) {
                    vm.deletedPostResponseData = { status: response.status, data: response.data, deletedId: postId };
                    vm.deletePostStatus = 'Post ' + postId + ' deleted successfully (simulated)! Status: ' + response.status;
                    console.log("DELETE request successful (simulated) for ID " + postId + ":", response.status);
                    // Clear the ID from input if it matches
                    if (vm.postIdToDelete == postId) {
                        vm.postIdToDelete = null;
                    }
                    // Remove from lists if present
                    vm.allPosts = vm.allPosts.filter(function(post) { return post.id !== postId; });
                    vm.allPostsForDelete = vm.allPostsForDelete.filter(function(post) { return post.id !== postId; });
                })
                .catch(function(error) {
                    vm.deletePostStatus = 'Failed to delete post ' + postId + ': ' + (error.statusText || 'Unknown error');
                    vm.deletePostError = true;
                    console.error("DELETE request error (simulated) for ID " + postId + ":", error);
                });
        };

        vm.getAllPostsForDelete = function() {
            vm.allPostsForDeleteError = '';
            vm.allPostsForDelete = [];
            $http.get(vm.apiUrl + '/posts')
                .then(function(response) {
                    vm.allPostsForDelete = response.data; // Using a separate list for the delete view
                    console.log("GET all posts for delete view successful:", response.data);
                })
                .catch(function(error) {
                    vm.allPostsForDeleteError = 'Failed to fetch posts for deletion: ' + (error.statusText || 'Unknown error');
                    console.error("GET all posts for delete view error:", error);
                });
        };

        // Helper to clear messages when changing views (optional, can be done by $rootScope.$on('$routeChangeSuccess', ...))
        // For simplicity, we'll rely on re-init or specific clearing in functions for now.
        // Example: $location.path() can be used to check current path if needed for conditional logic.

        // Initialize data for current view if needed (e.g. if landing directly on a view)
        // This logic could be more sophisticated with route resolve or specific controllers per view.
        // For now, let MainController handle all.
        if ($location.path() === '/get') {
            // vm.getAllPosts(); // Optionally auto-load posts on GET view
        } else if ($location.path() === '/delete') {
            // vm.getAllPostsForDelete(); // Optionally auto-load posts on DELETE view
        }

    }]);
