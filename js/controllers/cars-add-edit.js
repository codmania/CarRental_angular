(function(){
    angular.module('rentalAdmin')

    .controller('CarsAddEditController', ['$scope', '$routeParams', '$http', 'spinnerService', 'Notification', function($scope, $routeParams, $http, spinnerService, Notification) {
        
    	var controller = this;
        
    //  Populating select lists with options
 	    $scope.rentalClassOptions = [
 	    {name: "Compact", value: 'A' }, 
 	    {name: "Comfort", value: 'B'}, 
 	    {name: "Familie", value: 'C' },
 	    {name: "Luxe", value: 'D' } 	    
 	    ];
		$scope.rentalClassOption = {type: $scope.rentalClassOptions[0].value};


 	    $scope.carStateOptions = [
		{ name: 'Jong gebruikt', value: 'Jong gebruikt' }, 
		{ name: 'Nieuw', value: 'Nieuw' }, 
		];						
		$scope.carStateOption = { type: $scope.carStateOptions[0].value};
 	    
 	    $scope.status = { state: 0 };
 	    
	 	//	Setting default price per km
	 	$scope.pricePerKm = 0;	
 		
	 	$scope.price1x1 = 0;
	 	$scope.price2x1 = 0;
	 	$scope.price3x1 = 0;
	 	
	 	$scope.price1x2 = 0;
	 	$scope.price2x2 = 0;
	 	$scope.price3x2 = 0;
	 	
	 	$scope.price1x3 = 0;
	 	$scope.price2x3 = 0;
	 	$scope.price3x3 = 0;

	 	$scope.price1x4 = 0;
	 	$scope.price2x4 = 0;
	 	$scope.price3x4 = 0;
    	
//    	$http.get('/rental-admin/resources/demo-json/car-list.json').success(function(data){
    	$http.get('/angular/demo-json/car-list.json').success(function(data){
//        $http.get('/rental-admin/autos/').success(function(data){
			
        	controller.carCollection = data;
       	 	for(var key in controller.carCollection){
                if (controller.carCollection[key]['typeId'].toString() === $routeParams.id) {
                    
               	 $scope.car = controller.carCollection[key];
               	 	var typeId = $scope.car.typeId;
               	 	var brand = $scope.car.brand;
               	 	var model = $scope.car.model;
               	 	var modelYear = $scope.car.modelYear;
               	 	var jatoImageUrl = $scope.car.jatoImageUrl;
               	 	var bodyType = $scope.car.bodyType;
               	 	var fuel = $scope.car.fuel;
               	 	var additionalPricePerKm = $scope.car.additionalPricePerKm;
                    var additionalTax = $scope.car.additionalTax;
           	 		var rentalClass = $scope.car.rentalClass;
           	 		var carState = $scope.car.carState;
           	 		var status = $scope.car.status;
       	 			console.log(additionalPricePerKm);
//           		 	$scope.price1x1 = $scope.car.priceMatrix.price1;
//           		 	$scope.price2x1 = $scope.car.priceMatrix.price2;
//           		 	$scope.price3x1 = $scope.car.priceMatrix.price3;
//           		 	
//           		 	$scope.price1x2 = $scope.car.priceMatrix.price4;
//           		 	$scope.price2x2 = $scope.car.priceMatrix.price5;
//           		 	$scope.price3x2 = $scope.car.priceMatrix.price6;
//           		 	
//           		 	$scope.price1x3 = $scope.car.priceMatrix.price7;
//           		 	$scope.price2x3 = $scope.car.priceMatrix.price8;
//           		 	$scope.price3x3 = $scope.car.priceMatrix.price9;
//
//           		 	$scope.price1x4 = $scope.car.priceMatrix.price10;
//           		 	$scope.price2x4 = $scope.car.priceMatrix.price11;
//           		 	$scope.price3x4 = $scope.car.priceMatrix.price12;    	 		
           	 		
           	 		
           	 		// 	Setting accessories checkboxes
			  			var hasAccessories = []
			  			hasAccessories = $scope.car.accessories;
			  			if (hasAccessories.indexOf('navigatie') > -1) { $scope.navigatie = true }
			  			if (hasAccessories.indexOf('trekhaak') > -1) { $scope.trekhaak = true }
           	 		
           	 		// 	Setting services checkboxes
			  			var hasServices = []
			  			hasServices = $scope.car.services;
			  			
			  			if (hasServices.indexOf('winterbanden') > -1) { $scope.winterbanden = true }
			  			if (hasServices.indexOf('tankpas') > -1) { $scope.tankpas = true }
			  			if (hasServices.indexOf('verlaging_er_150') > -1) { $scope.verlaging_er_150 = true }
			  			if (hasServices.indexOf('afkoop_er') > -1) { $scope.afkoop_er = true }
           	 		
           	 		
			  			spinnerService.hide('lpSpinner');
           	 		// Setting modelYear
		  				$scope.modelYear = modelYear;
           	 		
					//	Setting bijtelling/additionalTax
	 					$scope.additionalTax = additionalTax;
					
					//	Setting rental class
            	 		$("#rentalClass").val("string:" + rentalClass);

					//	Setting car state
            	 		$scope.carStateOption = { type: carState};
            	 		
					//	Setting Status
						$scope.status = { state: status };
           	 		
	                  
						// calling our submit function.
	                    $scope.UpdateData = {};
	                    $scope.UpdateData = function() {
	                    	
	                    	
	               		 	var price1x1 = $scope.price1x1;
	               		 	var price2x1 = $scope.price2x1;
	               		 	var price3x1 = $scope.price3x1;
	               		 	
	               		 	var price1x2 = $scope.price1x2;
	    	           		var price2x2 = $scope.price2x2;
	    	           		var price3x2 = $scope.price3x2;
	    	           		 	
	    	           		var price1x3 = $scope.price1x3;
	    	           		var price2x3 = $scope.price2x3;
	    	           		var price3x3 = $scope.price3x3;
	    	
	    	           		var price1x4 = $scope.price1x4;
	    	           		var price2x4 = $scope.price2x4;
	    	           		var price3x4 = $scope.price3x4;
	                    	
	                    	var status = $scope.status.state;
	                    	var rentalClass = $scope.rentalClassOption.type
	                    	var carState = $scope.carStateOption.type
	                    	var additionalTax = $scope.additionalTax;
	                    	var additionalPricePerKm = $scope.pricePerKm;
	                    		
                    		var accessories = [];
                    		if ($scope.navigatie === true) { accessories.push("navigatie") }
                    		if ($scope.trekhaak === true) { accessories.push("trekhaak") }
                    		
                    		var services = [];
                    		if ($scope.winterbanden === true) { services.push("winterbanden")}
                    		if ($scope.tankpas === true) { services.push("tankpas")}
                    		if ($scope.verlaging_er_150 === true) { services.push("verlaging_er_150")}
                    		if ($scope.afkoop_er === true) { services.push("afkoop_er")}
	                    	
                    		var priceMatrix = {"price1": price1x1, "price2": price2x1, "price3": price3x1,
                    							"price4": price1x2, "price5": price2x2, "price6": price3x2,
                    							"price7": price1x3, "price8": price2x3, "price9": price3x3,
                    							"price10": price1x4, "price11": price2x4, "price12": price3x4
                    				}
                    		
		                    var theData = {"typeId": typeId,
		                    	    "brand": brand,
		                    	    "model": model,
		                    	    "modelYear": modelYear,
		                    	    "jatoImageUrl": jatoImageUrl,
		                    	    "bodyType": bodyType,
		                    	    "fuel": fuel,
		                    	    "additionalTax": additionalTax,
		                    	    "rentalClass": 	rentalClass,
		                    	    "additionalPricePerKm": additionalPricePerKm,
		                    	    "carState": carState,
		                    	    "status": status,
		                    	    "accessories": accessories,
		                    	    "services": services,
		                    	    "priceMatrix": priceMatrix
		                    	    };
	                    	console.log(theData);
	                    	
	                    // Posting data
	                    $http({
	                      method  : 'POST',
	                      url     : '/rental-admin/autos/opslaan/',
	                      data    : theData,
	                      headers : {'Content-Type': 'application/json'} 
	                     }).success(function(data) {
			  	              	var status = data.status;
			  	              	if (!status === '200') {
			  	              		Notification.error('Opslaan mislukt. Status: ' + status);
			  	              	} else {
			  	              		Notification.success('Opslaan is gelukt!');
			  	              		$('.back-to-overview.toggle').addClass('active');
			  	              		}})	
			  	             .error(function (data, status){
					  			Notification.error('Opslaan mislukt. Status: ' + status);
				  			});
	                    };	
	                    
                }
            }
       })
       .catch(function (err) {
       console.error(err);
	  	})
	  	.finally(function () {
			spinnerService.hide('jlobSpinner');
	  	});

    }]);
    

})();
 
