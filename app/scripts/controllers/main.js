'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', function ($timeout, $routeParams, persist) {
    var self = this;
    $('#create').focus();
    var data = persist.getData();
    this.list = data[$routeParams.i];
    this.createItem = function(item) {
      if (item.name === '') {
        return;
      }
      self.list.items.push(item);
      persist.saveData(data);
      self.newItem = {};
      $('#create').focus();
    };

    this.remove = function(index) {
      self.list.items.splice(index, 1);
      persist.saveData(data);
      $('#create').focus();
    };

    this.editList = function() {
      self.tempList = angular.copy(self.list);
      self.editingList = true;
      $timeout(function() {
        $('#listName')[0].select();
      });
    };

    this.updateList = function() {
      self.list.name = self.tempList.name;
      persist.saveData(data);
      self.editingList = false;
    };

    this.toggleItem = function(item) {
      item.done = !item.done;
      persist.saveData(data);
    };
  });
