(function(){
    angular.module('rentalAdmin').config(function($routeProvider){
    	$routeProvider.when('/', {
    		title: 'Auto Overzicht',
            templateUrl: '/angular/templates/pages/cars-table/index.html'
    	})
        
        .when('/add', {
        	title: 'Auto Toevoegen',
            templateUrl: '/angular/templates/pages/add-car/index.html'
        })

        .when('/edit/:id', {
        	title: 'Auto Bewerken',
            templateUrl: '/angular/templates/pages/edit-car/index.html',
            controller: 'CarsAddEditController',
            controllerAs: 'controller'
        })      
      
        .otherwise( { 
        	redirectTo: '/' });
    });
    

})();