(function() {'use strict'; 

angular.module('app.views.contact', [])
.controller('contactCtrl', ['$scope', '$http', '$httpParamSerializer', function($scope, $http, $httpParamSerializer) {
    
    $scope.submitting = false;
    $scope.submit = function(form) {
        $scope.submitting = true;
        $http({
            method: 'POST',
            url: 'api/send.php',
            data: $httpParamSerializer({
                'name': $scope.name,
                'email': $scope.email,
                'subject': $scope.subject,
                'message': $scope.message
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            $scope.submitting = false;
            $scope.name = null;
            $scope.email = null;
            $scope.subject = null;
            $scope.message = null;
            form.$setPristine();
            $.notify({
                message: 'Thank you for your message!' 
            },{
                type: 'success'
            });
        }, function(response) {
            $scope.submitting = false;
            console.error(response);
            $.notify({
                message: 'Ops, something went wrong... Please send email to "matjaz.mav@gmail.com".' 
            },{
                type: 'danger'
            });
        });
    };
    
}]);
    
})();