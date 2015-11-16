(function() {
 var rentalAdmin = angular.module('rentalAdmin', ['ngRoute', 'smart-table', 'cars-table', 'angularSpinners', 'ui-notification']);
 
 rentalAdmin.config(function(NotificationProvider) {
     NotificationProvider.setOptions({
         delay: 10000,
         startTop: 10,
         startRight: 40,
         verticalSpacing: 20,
         horizontalSpacing: 20,
         positionX: 'right',
         positionY: 'top'
     });
 });
 
 
 angular.module('rentalAdmin').run(['$rootScope', function($rootScope) {
	    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	        $rootScope.title = current.$$route.title;
	    }); 
	}]);
})();