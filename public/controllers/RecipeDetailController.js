angular.module('app')
.controller('RecipeDetailController', function($scope, $location, dataService) {
	
	!function(vm) {
	
		let path = $location.path().split('/');
		let id = path[path.length - 1];
		vm.error = true;
		
		// set up page variables
		vm.categories = {};
		vm.foodItems = {};
		vm.new = true;
		vm.editedRecipe = {};

		// create an object with functions used to process the page
		vm.functions = {
			
			// on new recipe, set steps and ingredients to empty arrays
			add: function () {
				vm.editedRecipe.steps = [];
				vm.editedRecipe.ingredients = [];
				},
			// get recipe from database
			edit: function () { 
					dataService.getRecipeById(id)
					.then(function (result) {
						// set prepTime and cookTime to integers since they are stored as strings in db
						result.data.prepTime = parseInt(result.data.prepTime);
						result.data.cookTime = parseInt(result.data.cookTime);
						vm.currentRecipe = (result !== 'null') ? vm.setCurrentRecipe(result.data) : {};
					}, function (reason) {
						console.error('REASON', reason);
					});
				},
			// initialize page
			init: function () {
				(function () { 
					dataService.getCategories()
					.then(function (result) {
						vm.categories = (result !== 'null') ? result.data : {};
					}, function (reason) {
						console.error('CATEGORIES ERROR', reason);
					});
				})();

				(function () { 
					dataService.getFoodItems()
					.then(function (result) {
						vm.foodItems = (result !== 'null') ? result.data : {};
					}, function (reason) {
						console.error('FOOD ITEMS REASON', reason);
					});
				})();
			},
			// add the recipe
			addRecipe: function (recipe) {
				vm.checkValid();
				
				// do not allow submit if steps or ingredients are empty
				if (vm.error) {
					return;
				}
				
					dataService.create(recipe)
				.then(function (result) {
					vm.go('/');
				}, function (reason) {
					console.error('ADD RECIPE', reason);
				});
			},
			// update an existing recipe
			updateRecipe: function (recipe) {
					dataService.update(recipe)
				.then(function (result) {
					vm.go('/');
				}, function (reason) {
					console.error('UPDATE RECIPE', reason);
				});
			}
		};

		// add an ingredient
		vm.addIngredient = function () {
			let ingredient = { condition: '', amount: '' };
			vm.editedRecipe.ingredients.push(ingredient);
		}

		// add a step
		vm.addStep = function () {
			let step = { description: '' };
			vm.editedRecipe.steps.push(step);
		}

		// remove an item. Generic to be used for both steps and ingredients arrays
		vm.removeItem = function (item, array) {
			let index = array.indexOf(item);
			array.splice(index, 1);
		}

		// set the recipe so that it's seen as being edited
		vm.setCurrentRecipe = function (recipe) {
			vm.new = false;
			vm.error = false;
			vm.editedRecipe = angular.copy(recipe);
		};

		// either add a recipe or updating an existing recipe
		vm.add = function (recipe) {
			if (vm.new === true) {
				vm.functions.addRecipe(recipe);
			} else {
				vm.functions.updateRecipe(recipe);
			}
		};

		// redirect browser to path
		vm.go = function (path) {
			dataService.go( path );
		};
		
		// check if steps and ingredients were empty
		// used on recipe-detail.html to check ingredients and steps when typing
		vm.checkValid = function() {
			if (vm.editedRecipe.steps.length == 0 || vm.editedRecipe.ingredients.length == 0) {
				vm.error = true;
			} else {
				vm.error = false;
			}	
		};

		// checks if path contains add, otherwise this is an existing recipe
		if (id === 'add') {
			vm.functions.add();
		} else {
			vm.functions.edit();
		}

		// initialize the page arrays
		vm.functions.init();
		
		return vm;
		
	}(this);
	
});