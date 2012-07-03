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
              $scope.transactions.push(val);
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
    $scope.transactions.unshift(trans);
    $scope.current = $scope.current + $scope.amount;
    $scope.message = "Transaction for $" + $scope.amount.toFixed(2) + " saved.";
    trans.save(null, {
      error: function(transaction, error) {
        alert("Oops, that didn't work. Reload the page and try again, maybe?");
      }
    });
  }

  $scope.removeTransaction = function(transaction) {
    $scope.transactions.splice($scope.transactions.indexOf(transaction), 1);
    $scope.current = $scope.current - transaction.attributes.amount;
    $scope.message = "Transaction for $" + transaction.attributes.amount.toFixed(2) + " deleted.";
    transaction.destroy({
      error: function(transaction, error) {
        alert("Oops, that didn't work. Reload the page and try again, maybe?");
      }
    });
  }

}
