'use strict';

/* Controllers */
function AppCtrl($scope) {
}

function LoginCtrl($scope, parseService) {
  $scope.loginUser = function() {
    var success = parseService.login($scope.email, $scope.password);
    if (!success[0]) {
      alert(success[1]);
    }
  }
}

function AccountCtrl($scope, parseService) {
  $scope.saveUser = function() {
    parseService.saveUser($scope.email, $scope.password, $scope.limit);
  }
}
