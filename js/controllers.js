'use strict';

/* Controllers */
function MainCtrl($scope, parseService) {
  $scope.loggedIn = function() {
    return parseService.loggedIn();
  }
  $scope.logout = function() {
    parseService.logout();
  }
}
function AppCtrl($scope, parseService) {
  Parse.initialize("hCnt4S3bcWaZRDUQxoz4knP8KvYncQ4UGkwqwIq1", "PrQttkfi0FHWEQwoBt3iMFX2BkqVOBpwlyS0BQB6");
  var user = parseService.loggedIn();
  if (user) {
    $scope.limit = user.get("limit");
    $scope.current = user.get("current");
  } else {
    $scope.limit = 500;
    $scope.current = 0;
  }


  $scope.addTransaction = function() {
    $scope.current += $scope.curTransaction;
    console.log($scope.current);
  }
}

function LoginCtrl($scope, parseService) {
  $scope.loginUser = function() {
    var response = parseService.login($scope.email, $scope.password);
  }
}

function AccountCtrl($scope) {
  $scope.saveUser = function() {
    parseService.saveUser($scope.email, $scope.password, $scope.limit);
  }
}
