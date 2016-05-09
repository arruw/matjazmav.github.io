(function() {'use strict'; 

angular.module('app.views.about', [])
.controller('aboutCtrl',
['$scope', '$rootScope', '$location', 'anchorSmoothScroll',
function($scope, $rootScope, $location, anchorSmoothScroll) {
    
    $rootScope.$watch('resume', function(resume){
        renderJson(resume);
        setTimeout(function(){
            var hash = $location.hash();
            if(hash) anchorSmoothScroll.scrollTo('anchor-' + hash);
        }, 500);
    }, true);
    
    var renderJson = function(json) {
        $('#json').html(myon.renderJson(json));
    };
}]);
    
})();