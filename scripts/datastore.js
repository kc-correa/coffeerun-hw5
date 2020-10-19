(function (window) {
    'use strict';
    var App = window.App || {};
    var Promise = window.Promise;

    function DataStore() {
        this.data = {};
    }

    function promiseResolvedWith(value) {
        var promise = new Promise(function (resolve, reject) {
            resolve(value);
        });
        return promise;
    }

    DataStore.prototype.add = function (key, val) {
        var collection = firebase.firestore().collection(this.data[key] = val);
        return promiseResolvedWith(null);
    };

    DataStore.prototype.get = function (key) {
        return firebase.firestore().collection(this.data[key] = val).doc(promiseResolvedWith(this.data[key])).get();
    };

    DataStore.prototype.getAll = function () {
        var query = firebase.firestore()
            .collection(this.data[key] = val)
            .orderby(coffee, strength)
            .limit(50);
        
        this.getDocumentsInQuery(query, renderer);
        return promiseResolvedWith(this.data);
    };

    DataStore.prototype.remove = function (key) {
        delete this.data[key];
        return promiseResolvedWith(null);
    };

    FriendlyEats.prototype.getDocumentsInQuery = function(query, renderer) {
        query.onSnapshot(function(snapshot) {
          if (!snapshot.size) return renderer.empty();
      
          snapshot.docChanges().forEach(function(change) {
            if (change.type === 'removed') {
              renderer.remove(change.doc);
            } else {
              renderer.display(change.doc);
            }
          });
        });
      };

    App.DataStore = DataStore;
    window.App = App;
})(window);