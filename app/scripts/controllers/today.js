'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('TodayCtrl', function (persist, $location) {
    var self = this;
    this.lists = persist.getData();
    this.addList = function() {
      self.lists.push({name: 'New List', items: []});
      persist.saveData(self.lists);
      $location.url("/list/" + (self.lists.length - 1));
    };
    this.deleteList = function(index) {
      self.lists.splice(index, 1);
      persist.saveData(self.lists);
    }
  });
