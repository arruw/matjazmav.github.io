(function() {'use strict'; 

angular.module('app.views.resume', [])
.controller('resumeCtrl',
['$scope', '$rootScope', '$location', 'anchorSmoothScroll',
function($scope, $rootScope, $location, anchorSmoothScroll) {
    $rootScope.$watch('resume', function(resume){
        $scope.resume = resume;
    }, true);
}]);
    
})();