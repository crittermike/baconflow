'use strict';

/* Services */

angular.module('baconflow.services', [])
  .service('parseService', function () {
    return {
      login:function (email, password) {
        Parse.initialize("hCnt4S3bcWaZRDUQxoz4knP8KvYncQ4UGkwqwIq1", "PrQttkfi0FHWEQwoBt3iMFX2BkqVOBpwlyS0BQB6");
        Parse.User.logIn(email, password, {
          success: function(user) {
            return [true, user];
          },
          error: function(user, error) {
            return [false, "Error: " + error.code + " " + error.message];
          }
        });
      },
      saveUser:function (email, password, limit) {
        Parse.initialize("hCnt4S3bcWaZRDUQxoz4knP8KvYncQ4UGkwqwIq1", "PrQttkfi0FHWEQwoBt3iMFX2BkqVOBpwlyS0BQB6");
        
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
        Parse.initialize("hCnt4S3bcWaZRDUQxoz4knP8KvYncQ4UGkwqwIq1", "PrQttkfi0FHWEQwoBt3iMFX2BkqVOBpwlyS0BQB6");
      }
    };
  })
