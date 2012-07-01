'use strict';

/* Controllers */
function UserCtrl($scope) {
  Parse.initialize("hCnt4S3bcWaZRDUQxoz4knP8KvYncQ4UGkwqwIq1", "PrQttkfi0FHWEQwoBt3iMFX2BkqVOBpwlyS0BQB6");
  $scope.loggedIn = Parse.User.current();

  $scope.login = function() {
    Parse.User.logIn($scope.email, $scope.password, {
      success: function(user) {
        $scope.$apply(function() {
          $scope.loggedIn = true;
          $('#loginForm').modal('hide');
        });
      },
      error: function(user, error) {
        $scope.$apply(function() {
          $scope.loginError = 'Incorrect login information.';
        });
      }
    });
  }

  $scope.logout = function() {
    Parse.User.logOut();
    $scope.loggedIn = false;
  }

  $scope.saveUser = function() {
    var user = Parse.User.current();
    if (!user) {
      user = new Parse.User();
    } 
    user.set("username", $scope.email);
    if ($scope.password) {
      user.set("password", $scope.password);
    }
    user.set("email", $scope.email);
    user.set("limit", $scope.limit);
    user.signUp(null, {
      success: function(user) {
        $scope.$apply(function() {
          $scope.loggedIn = true;
          $('#accountForm').modal('hide');
        });
      },
      error: function(user, error) {
        $scope.$apply(function() {
          $scope.loginError = 'Incorrect login information.';
        });
      }
    });
  }
}

function AppCtrl($scope) {
  var user = Parse.User.current();
  var Transaction = Parse.Object.extend("Transaction");

  var d = new Date();
  var curMonth = new Date(d.getYear(), d.getMonth() + 1, 0);
  $scope.daysInMonth = curMonth.getDate();
  $scope.curDay = d.getDate();
  $scope.transactions = [];

  if (user) {
    $scope.limit = user.get("limit");
    $scope.current = 0;
    var thisMonth = d.getMonth();
    var transDate;
    var query = new Parse.Query(Transaction);
    query.equalTo("user", user);
    query.find({
      success: function(results) {
        $scope.$apply(function() {
          angular.forEach(results, function(val, key) {
            transDate = new Date(val.createdAt);
            if (transDate.getMonth() == thisMonth) {
              $scope.transactions.push(val.attributes.amount);
              $scope.current += val.attributes.amount;
            }
          });
        });
      }
    });

  } else {
    $scope.limit = 1000;
    $scope.current = 0;
  }

  $scope.addTransaction = function() {
    var trans = new Transaction();
    trans.set("amount", $scope.amount);
    trans.set("user", user);
    trans.save(null, {
      success: function(post) {
        $scope.$apply(function() {
          $scope.current = $scope.current + $scope.amount;
        });
      }
    });
  }
}
