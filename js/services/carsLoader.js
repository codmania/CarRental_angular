(function() {
    var app = angular.module('cars-table', []);
	app.factory('CarsLoader', function() {

//        $http.get('/rental-admin/resources/demo-json/car-list.json').success(function(data){
//        	controller.carCollection = data;
//        });

		return { messsage: "Hello World"}
	});

})();