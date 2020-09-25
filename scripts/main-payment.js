(function (window) {
    'use strict';
    var FORM_SELECTOR = '[method="post"]';
    var App = window.App;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var Payment = App.Payment;
    var myPayment = new Payment(new DataStore());
    window.myPayment = myPayment;
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(myPayment.createPayment.bind(myPayment));
    console.log(formHandler);
})(window);