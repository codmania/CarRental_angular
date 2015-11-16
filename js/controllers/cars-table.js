(function(){
    var app = angular.module('cars-table', []);
    
    app.controller('safeCtrl', ['$window', '$http', '$scope', 'Notification', function ($window, $http, $scope, Notification) {
        
		$scope.rowCollection = [];

		$http.get('/angular/demo-json/car-list.json').success(function(data){
//		$http.get('/rental-admin/autos/').success(function(data){
        	//Notification.success('Autogegevens geladen.');
			$scope.rowCollection = data;
		}).error(function(data, status){
			Notification.error('Sorry, er ging iets mis. Foutcode: 	' + status);
		});

		$scope.displayedCollection = $scope.rowCollection;
		
		
		
		//remove car
		$scope.removeItem = function removeItem(car) {
			var index = $scope.rowCollection.indexOf(car);
			if ($window.confirm('Weet u zeker dat u deze auto wilt verwijderen?')) {
				if (index !== -1) {
					
                    var typeId = $scope.rowCollection[index].typeId;
	  	          	$http({
		  	            method  : 'POST',
		  	            url     : '/rental-admin/autos/delete/' + typeId,
		  	            headers : {'Content-Type': 'application/json'} 
	  	           }).success(function(data) {
	  	              	var status = data.status;
	  	              	if (!status === '200') {
	  	              		Notification.error('Verwijderen mislukt. Status: ' + status);
	  	              	} else {
	  	              		Notification.success('De auto is verwijderd.');
	  	              		$scope.rowCollection.splice(index, 1);
	  	              	}
	  	        	    
	  	              	spinnerService.hide('lpSpinner');
	  	              	
	  	              }).error(function (data, status){
			  			Notification.error('Sorry, er ging iets mis. Foutcode: 	' + status);
			  			spinnerService.hide('lpSpinner');
		  			});
					// Posting data to php file
                    
                    

				}
			}
			
		};
	
	}]);    
})();
