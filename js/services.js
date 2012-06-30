'use strict';

/* Services */

angular.module('baconflowServices', [])
  .service('parseService', function() {
    Parse.initialize("hCnt4S3bcWaZRDUQxoz4knP8KvYncQ4UGkwqwIq1", "PrQttkfi0FHWEQwoBt3iMFX2BkqVOBpwlyS0BQB6");
    return {
      login:function (email, password) {
        var response;
        Parse.User.logIn(email, password, {
          success: function(user) {
            response = [true, user];
          },
          error: function(user, error) {
            response = [false, "Error: " + error.code + " " + error.message];
          }
        });
        alert(response) // still undefined;
      },

      logout: function() {
        Parse.User.logOut();
      },

      loggedIn: function() {
        return Parse.User.current();
      },

      saveUser:function (email, password, limit) {
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
            return [true, user];
          },
          error: function(user, error) {
            return [false, "Error: " + error.code + " " + error.message];
          }
        });
      },

      addTransaction:function (amount) {
        return 1;
      }
    };
  })
