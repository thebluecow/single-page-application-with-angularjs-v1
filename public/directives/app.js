// https://stackoverflow.com/questions/35501303/confirm-dialog-box-in-angularjs

(function() {

'use strict';

angular.module('app')
.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
	}])
})();