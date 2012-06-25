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
    user.set("current", $scope.current);
    user.save(null, {
      success: function(user) {
        $scope.curTransaction = 0;
      }
    })
  }
}

function LoginCtrl($scope) {

}

function AccountCtrl($scope) {
  Parse.initialize("hCnt4S3bcWaZRDUQxoz4knP8KvYncQ4UGkwqwIq1", "PrQttkfi0FHWEQwoBt3iMFX2BkqVOBpwlyS0BQB6");

  var user = Parse.User.current();
  if (!user) {
    user = new Parse.User();
  } else {
    $scope.email = user.get("email");
    $scope.limit = user.get("limit");
    $scope.current = user.get("current");
  }

  $scope.saveUser = function() {
    user.set("username", $scope.email);
    if ($scope.password) {
      user.set("password", $scope.password);
    }
    user.set("email", $scope.email);
    user.set("limit", $scope.limit);
    user.set("current", 0);

    user.signUp(null, {
      success: function(user) {
        alert("You signed up! Now go track some transactions!");
      },
      error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }
}
