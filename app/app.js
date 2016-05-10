(function() {'use strict';
    
angular.module('app', ['ngRoute', 'angular-ladda', 'jcs-autoValidate', 'app.views.about', 'app.views.resume', 'app.views.contact'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'app/views/about/aboutView.html',
            controller: 'aboutCtrl' 
        }).
        when('/contact', {
            templateUrl: 'app/views/contact/contactView.html',
            controller: 'contactCtrl' 
        }).
        otherwise({
            redirectTo: '/' 
        });
}])
.run(['$http', '$rootScope', 'sidebarService', function($http, $rootScope, sidebarService) {
    $http.get('app/assets/json/resume.json').then(function(response) {
        $rootScope.resume = response.data;
    }, function(response) {
        console.error(response);
        renderJson({'Message': 'Ops, something went wrong...'});
    });
        
    var resizeHandler = function() {
        if ($(window).height() < 420) {
            sidebarService.hide(250);
            $('#sidebar #menu').hide();
        } else {
            $('#sidebar #menu').show();
        }
    };
    
    window.onload = resizeHandler;
    window.onresize = resizeHandler;
}])
.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
})
.service('sidebarService', [function() {
    var content = $('#content');
    var sidebar = $('#sidebar');
    
    var toggle = false;
    var toggleDuration = 250;
    this.toggle = function() {
        if(toggle) {
            this.hide(toggleDuration);
        } else {
            this.show(toggleDuration);
        }
    };
    
    this.hide = function(duration) {
        if(!toggle) return;
        toggle = !toggle;
        content.animate({
            'margin-left': '40px',
        }, duration);
        sidebar.animate({
            'width': '40px'
        }, duration);
        sidebar.addClass('sidebar-min');
        sidebar.removeClass('sidebar-max');
    };
    
    this.show = function(duration) {
        if(toggle) return;
        toggle = !toggle;
        content.animate({
            'margin-left': '175px',
        }, duration);
        sidebar.animate({
            'width': '175px'
        }, duration, function() {
            sidebar.addClass('sidebar-max');
            sidebar.removeClass('sidebar-min');
        });
    };
}])
.controller('sidebarCtrl',
['$scope', '$location', 'sidebarService',
function($scope, $location, sidebarService) {   
    $scope.sidebarToggle = function() {
        sidebarService.toggle();
    }; 
    $scope.isSelected = function (path) {
        var selected = $location.path();
        return selected == path;
    };
}]);
    
})(window);
