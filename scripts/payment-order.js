(function (window) {
    'use strict';
    var App = window.App || {};

    function Payment(db) {
        this.db = db;
    }

    Payment.prototype.createPayment = function (payment) {
        console.log('Adding payment for ' + payment.usermail);
        this.db.add(payment.usermail, payment);
    };

    Payment.prototype.finalizePayment = function (customerId) {
        console.log('Payment finalized for ' + customerId);
        this.db.remove(customerId);
    };

    Payment.prototype.printReceipt = function (name) {
        var customerIdArray = Object.keys(this.db.getAll());

        console.log('Receipt for ' + name.username);
        customerIdArray.forEach(function (id) {
            console.log(this.db.get(id));
        }.bind(this));
    };

    App.Payment = Payment;
    window.App = App;
})(window);