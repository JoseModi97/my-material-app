angular.module('myApp', [])
    .controller('MainController', ['$http', function($http) {
        var vm = this;
        vm.apiUrl = 'https://jsonplaceholder.typicode.com';

        // Placeholder for GET request result
        vm.post = null;
        vm.getError = '';

        // Placeholder for POST request result
        vm.postResponse = null;
        vm.postError = '';

        // Placeholder for PUT request result
        vm.putResponse = null;
        vm.putError = '';

        // Placeholder for DELETE request result
        vm.deleteResponse = null;
        vm.deleteError = '';

        // GET request function will be implemented in the next step
        vm.getPost = function() {
            vm.getError = '';
            vm.post = null;
            $http.get(vm.apiUrl + '/posts/1')
                .then(function(response) {
                    vm.post = response.data;
                    console.log("GET request successful:", response.data);
                })
                .catch(function(error) {
                    vm.getError = error.statusText || 'Failed to fetch post.';
                    console.error("GET request error:", error);
                });
        };

        // POST request function will be implemented in a later step
        vm.createPost = function() {
            vm.postError = '';
            vm.postResponse = null;
            var newPostData = {
                title: 'foo',
                body: 'bar',
                userId: 1
            };
            $http.post(vm.apiUrl + '/posts', newPostData)
                .then(function(response) {
                    vm.postResponse = response.data;
                    // JSONPlaceholder returns the created object with an id
                    console.log("POST request successful (simulated):", response.data);
                })
                .catch(function(error) {
                    vm.postError = error.statusText || 'Failed to create post.';
                    console.error("POST request error (simulated):", error);
                });
        };

        // PUT request function will be implemented in a later step
        vm.updatePost = function() {
            vm.putError = '';
            vm.putResponse = null;
            var updatedPostData = {
                id: 1, // Assuming we are updating post with id 1
                title: 'updated foo',
                body: 'updated bar',
                userId: 1
            };
            // Note: JSONPlaceholder will return the updated object but won't actually persist the change on their server.
            $http.put(vm.apiUrl + '/posts/1', updatedPostData)
                .then(function(response) {
                    vm.putResponse = response.data;
                    console.log("PUT request successful (simulated):", response.data);
                })
                .catch(function(error) {
                    vm.putError = error.statusText || 'Failed to update post.';
                    console.error("PUT request error (simulated):", error);
                });
        };

        // DELETE request function will be implemented in a later step
        vm.deletePost = function() {
            vm.deleteError = '';
            vm.deleteResponse = null;
            // Note: JSONPlaceholder will return an empty object and a 200 status but won't actually delete on their server.
            $http.delete(vm.apiUrl + '/posts/1')
                .then(function(response) {
                    vm.deleteResponse = { status: response.status, data: response.data }; // Often an empty object for DELETE
                    console.log("DELETE request successful (simulated):", response.status);
                })
                .catch(function(error) {
                    vm.deleteError = error.statusText || 'Failed to delete post.';
                    console.error("DELETE request error (simulated):", error);
                });
        };
    }]);
