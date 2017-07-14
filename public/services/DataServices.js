'use strict';

angular.module('app')
.service("dataService", function($http, $location, $httpParamSerializer) {
	
	!function(vm) {
		
		// The base URL for the REST API is http://localhost:5000/
		const HOME = 'http://localhost:5000';
		let config = {
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
		};
		
		// GET /api/recipes - Gets all of the recipes.
		vm.getRecipes = function() {
			return $http.get(HOME + '/api/recipes');
		};
		
		// GET /api/categories - Gets all of the categories.
		vm.getCategories = function() {
			return $http.get(HOME + '/api/categories');
		};
		
		// GET /api/fooditems - Gets all of the food items.
		vm.getFoodItems = function() {
			return $http.get(HOME + '/api/fooditems');
		};
		
		// GET /api/recipes?category={category} - Gets all of the recipes for the specified category.
		vm.getRecipesByCategory = function(category) {
			return $http.get(HOME + '/api/recipes/?category=' + category);
		};

		// GET /api/recipes/{id} - Gets the recipe for the specified ID.
		vm.getRecipeById = function(id) {
			return $http.get(HOME + `/api/recipes/${id}`);
		};
		
		// PUT /api/recipes/{id} - Updates the recipe for the specified ID.
		vm.update = function (recipe) {
			console.log('the id', recipe._id);
			return $http.put(HOME + `/api/recipes/${recipe._id}`, recipe);
		};
		
		// POST /api/recipes - Adds a recipe.
		vm.create = function (recipe) {
			return $http.post(HOME + '/api/recipes', $.param(recipe), config);
		};
		
		// DELETE /api/recipes/{id} - Deletes the recipe for the specified ID.
		vm.delete = function (id) {
			return $http.delete(HOME + `/api/recipes/${id}`);
		};
		
		// redirect browser to path
		vm.go = function (path) {
			return $location.path( path );	
		};
		
		return vm;	
		
	}(this);	
	
});