(function(){
    angular.module('rentalAdmin')

    .controller('loadCarJlob', ['$routeParams', '$scope', '$http', 'spinnerService', 'Notification', function($routeParams, $scope, $http, spinnerService, Notification) {

    	var carId = $routeParams.id;
    	
    	  $scope.loadJlob = function() {
    		  
    		  var typeId = $scope.typeId;
    		  if (!typeId) {
    			  console.log('No typeId entered.');
    			  Notification.error('Vul a.u.b. een Type ID in.');
    		  } else {
    			  	spinnerService.show('lpSpinner');
    			  	
    			  	$http.get('/angular/demo-json/democar.json').success(function(data) {
//			  		$http.get('/rental-admin/getVehicleTypeInfo/' + typeId).success(function(data) {
			  			$scope.typeId = data.typeId;
			  			$scope.brand = data.brand;
			  			$scope.model = data.model;
			  			$scope.image = data.jatoImageUrl;
			  			$scope.bodyType = data.bodyType;
			  			$scope.fuel = data.fuel;
			  			
			  			$scope.additionalTax = data.additionalTax;
			  			$scope.modelYear = data.modelYear;
			  			$scope.additionalPricePerKm = '0';
//			  			$scope.carState = carStateOption.type;
//			  			$scope.status = '0';

                		$scope.navigatie = false;
                		$scope.trekhaak = false;			  			
                		$scope.tankpas = false;
                		$scope.verlaging_er_150 = false;
			  			$scope.afkoop_er = false;
			  			
			  			Notification.success('Autogegevens succesvol geladen.');
			  			spinnerService.hide('lpSpinner');

			  			
			  			if (!$scope.brand) {
			  				Notification.error('Vul een geldig TypeId in.');
			  			} else {
			  				
			  				showNextSteps();
			  				
			  				$scope.UpdateData = {};
			  				$scope.UpdateData = function() {
				  	        	spinnerService.show('lpSpinner');
				  	        	
					  			var typeId = $scope.typeId;
					  			var brand = $scope.brand;
					  			var model = $scope.model;
					  			var jatoImageUrl = $scope.image;
					  			var bodyType = $scope.bodyType;
					  			var fuel = $scope.fuel;
					  			var modelYear = $scope.modelYear;
					  			var additionalTax = $scope.additionalTax;
					  			var additionalPricePerKm = $scope.pricePerKm;
					  			var carState = $scope.carStateOption.type;
					  			var rentalClass = $scope.rentalClassOption.type;
					  			var status = $scope.status.state;
				  				
					  			// accessoires
	                    		var navigatie = $scope.navigatie;
	                    		var trekhaak = $scope.trekhaak;
	                    		
	                    		// services
	                    		var winterbanden = $scope.winterbanden;
	                    		var tankpas = $scope.tankpas;
	                    		var verlaging_er_150 = $scope.verlaging_er_150;
					  			var afkoop_er = $scope.afkoop_er;
	                    		
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
					  			
	                    		var accessories = [];
	                    		if (navigatie === true) { accessories.push("navigatie") }
	                    		if (trekhaak === true) { accessories.push("trekhaak") }
	                    		
	                    		var services = [];
	                    		if (winterbanden === true) { services.push("winterbanden")}
	                    		if (tankpas === true) { services.push("tankpas")}
	                    		if (verlaging_er_150 === true) { services.push("verlaging_er_150")}
	                    		if (afkoop_er === true) { services.push("afkoop_er")}
	                    		
	                    		var priceMatrix = {"price1": price1x1, "price2": price2x1, "price3": price3x1,
            							"price4": price1x2, "price5": price2x2, "price6": price3x2,
            							"price7": price1x3, "price8": price2x3, "price9": price3x3,
            							"price10": price1x4, "price11": price2x4, "price12": price3x4
	                    		}	                    		
	                    		
				  	            var theData = {
			  	            		"typeId": typeId,
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
				  	              	}
				  	        	    
				  	              	spinnerService.hide('lpSpinner');
				  	              	
				  	              }).error(function (data, status){
						  			Notification.error('Sorry, er ging iets mis. Foutcode: 	' + status);
						  			spinnerService.hide('lpSpinner');
					  			});
				  	        }    
			  			}
			  		})
    		  }
    	  }
			  		
		  	          
	  		
			  		
    	  	
			
    	  var showNextSteps = function(){
    		  $scope.nextSteps = ($scope.nextSteps) ? true : true;
    		  return $scope.nextSteps;
    	  }
  		    




	
	}]);    
})();