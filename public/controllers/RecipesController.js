angular.module('app')
.controller('RecipesController', function($scope, $location, dataService) {
	
	!function(vm) {
	
		vm.recipes = [];
		vm.categories = [];
		
		// populate vm.recipes array with recipes from database
		vm.allRecipes = function () { 
			dataService.getRecipes()
			.then(function (result) {
				vm.recipes = (result !== 'null') ? result.data : {};
			}, function (reason) {
				console.error('RECIPES REASON', reason);
			});
	  	};

		// populate vm.categories array with categories from database
		vm.allCategories = function () { 
			dataService.getCategories()
			.then(function (result) {
				vm.categories = (result !== 'null') ? result.data : {};
			}, function (reason) {
				console.error('CATEGORIES REASON', reason);
			});
	  	};


		// delete recipe
		vm.delete = function (recipe) {
			dataService.delete(recipe._id)
			.then(function (result) {
				let index = vm.recipes.indexOf(recipe);
				vm.recipes.splice(index, 1);
			}, function (reason) {
				console.error('DELETE RECIPE', reason);
			});
		};

		// redirect browser to path
		vm.go = function (path) {
			dataService.go(path);
		};
		
		// populate recipes and categories
		vm.allRecipes();
		vm.allCategories();

		return vm;	
		
	}(this);
  
});