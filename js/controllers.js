'use strict';

/* Controllers */
function AppCtrl($scope) {
  Parse.initialize("hCnt4S3bcWaZRDUQxoz4knP8KvYncQ4UGkwqwIq1", "PrQttkfi0FHWEQwoBt3iMFX2BkqVOBpwlyS0BQB6");
  var user = Parse.User.current();

  $scope.limit = user.get("limit");
  $scope.current = user.get("current");

  $scope.addTransaction = function() {
    $scope.current += $scope.curTransaction;
    console.log($scope.current);
  }
}

function LoginCtrl($scope, parseService) {
  $scope.loginUser = function() {
    var success = parseService.login($scope.email, $scope.password);
    if (!success[0]) {
      alert(success[1]);
    }
  }
}

function AccountCtrl($scope) {
  $scope.saveUser = function() {
    parseService.saveUser($scope.email, $scope.password, $scope.limit);
  }
}
