(function(){

  'use strict';

  if (typeof ES6Promise === 'object') {
    ES6Promise.polyfill();
  }

  function get() {
    return new Promise(function(resolve, reject) {
      var value = Math.floor(Math.random() * 2);

      (value === 1) ? resolve(value) : reject(value);
    });
  }

  function ViewModel() {
    this.list = ko.observableArray([]);
    this.add = (function() {
      var that = this;

      get().then(function(value) {
        // resolve
        that.list.unshift({
          text: 'resolve: ' + value + ' / ' + new Date
        });
      })['catch'](function(value) {
        // reject
        that.list.unshift({
          text: 'reject: ' + value + ' / ' + new Date
        });
      });
    }).bind(this);
  }

  ko.applyBindings(new ViewModel);

}());
