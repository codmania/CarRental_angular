(function(angular) {
    angular.module('rentalAdmin')

    .controller('CarsAddEditController', ['$scope', '$routeParams', '$http', 'spinnerService', function($scope, $routeParams, $http, spinnerService) {
        
    	var controller = this;
        
//    	$http.get('/rental-admin/resources/demo-json/car-list.json').success(function(data){
    	$http.get('/angular/demo-json/car-list.json').success(function(data){
//        $http.get('/rental-admin/autos/').success(function(data){
			spinnerService.show('jlobSpinner');
        	controller.carCollection = data;
        	 for(var key in controller.carCollection){
                 if (controller.carCollection[key]['typeId'].toString() === $routeParams.id) {
                     
                	 $scope.car = controller.carCollection[key];

                     	var additionalTax = $scope.car.additionalTax;
            	 		var rentalClass = $scope.car.rentalClass;
            	 		var carState = $scope.car.carState;
            	 		var status = $scope.car.status;

					//	Setting bijtelling/additionalTax
 	 					$scope.additionalTax = additionalTax;
					
					//  Populating select lists with options
            	 	    $scope.rentalClassOptions = [
            	 	    {name: "Kleine auto", value: 'A' }, 
            	 	    {name: "Grote auto", value: 'B'}, 
            	 	    {name: "Snelle auto", value: 'C' }
            	 	    ];
						$scope.rentalClassOption = {type: $scope.rentalClassOptions[0].value};


            	 	    $scope.carStateOptions = [
						{ name: 'Gebruikt', value: 'gebruikt' }, 
						{ name: 'Ongebruikt', value: 'ongebruikt' }, 
						];						
						$scope.carStateOption = { type: $scope.carStateOptions[0].value};
            	 	    
            	 	    $scope.status = { value: 1 };
            	 		
					//	Setting rental class
             	 		$("#rentalClass").val("string:" + rentalClass);

					//	Setting car state
             	 		$("#carState").val("string:" + carState);

					//	Setting Status
						$scope.status = {
							state: status
						};
            	 		
            	 	//	Setting default price per km
	            	 	$scope.pricePerKm = 0;	
            	 		
                 }
             }
        })
        .catch(function (err) {
        console.error(err);
	  	})
	  	.finally(function () {
			spinnerService.hide('jlobSpinner');
	  	});
		var oldatx = '';
		var oldpricePerKm = '';
	 $scope.editcar = {
        
        additionalTax: function(newatx) {
            if (arguments.length) {
                oldatx = newatx;
            }
            return oldatx;
        },
		  pricePerKm: function(newpricePerKm) {
            if (arguments.length) {
                oldpricePerKm = newpricePerKm;
            }
            return oldpricePerKm;
        }
    };
  
//        var updateData = { "rentalClass": rentalClass };
//        console.log(updateData);
        
        // create a blank object to handle form data.
      $scope.UpdateData = {};
      // calling our submit function.
        $scope.UpdateData = function() {
        // Posting data to php file
        $http({
          method  : 'POST',
          url     : '/rental-admin/autos/opslaan/',
          data    : {"typeId": 121212,
        	    "brand": "Fiat",
        	    "model": "Astra",
        	    "modelYear": 2015,
        	    "jatoImageUrl": "https://dd-static.leaseplan.nl/jlobdd/img/jatofotos/audi/a3/2016/3ha_45.jpg",
        	    "bodyType": "Sedan",
        	    "fuel": "Benzine",
        	    "additionalTax": 20,
        	    "rentalClass": "C",
        	    "additionalPricePerKm": 0.25,
        	    "status": "0"},
          headers : {'Content-Type': 'application/json'} 
         })
          .success(function(data) {
            if (data.errors) {
              // Showing errors.
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
            } else {
              $scope.message = data.message;
            }
          });
        };    
        
        

    }]);
    

})(window.angular);