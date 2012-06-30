'use strict';

/* Services */

angular.module('baconflowServices', [])
  .service('parseService', function() {
    Parse.initialize("hCnt4S3bcWaZRDUQxoz4knP8KvYncQ4UGkwqwIq1", "PrQttkfi0FHWEQwoBt3iMFX2BkqVOBpwlyS0BQB6");
    return {
      login:function (email, password, callback) {
        Parse.User.logIn(email, password, {
          success: function(user) {
            callback([true, user]);
          },
          error: function(user, error) {
            callback([false, "Error: " + error.code + " " + error.message]);
          }
        });
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
        user.set("username", email);
        if (password) {
          user.set("password", password);
        }
        user.set("email", email);
        user.set("limit", limit);
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
