(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    CheckList.prototype.addClickHandler = function (fn) { //Will listen for a click event and bind the callback to the CheckList instance
        this.$element.on('click', 'input', function (event) { //Listen for a click event using jQuery's on method. Filtering selector passed as 2nd argument; tells the event handler to run the callback function only if the event was triggered by an <input> element
            var email = event.target.value;
            this.removeRow(email);
            fn(email);
        }.bind(this)); //Sets context object of the event handler function
    };

    CheckList.prototype.addRow = function (coffeeOrder) {
        //Remove any existing rows that match the email address
        this.removeRow(coffeeOrder.emailAddress);

        //Create a new instance of a row, using the coffee order info
        var rowElement = new Row(coffeeOrder);

        //Add the new row instance's $element property to the checklist
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function(email) {
        this.$element //chained several method calls together
            .find('[value="' + email + '"]') //Requirement for chaining is that a method must return a jQuery-wrapped selection in order to have another method call chained to it
            .closest('[data-coffee-order="checkbox"]')
            .remove();
    };

    //Constructors should never have a return statement; Javascript automatically returns a value for you when you use the keyword new with a constructor
    function Row(coffeeOrder) { //In charge of creating all the DOM elements necessary to represent a single coffee order, including the checkbox and text description
        var $div = $('<div></div>', { //jQuery's $ function creates elements, thus creating <div>; 2 arguments are passed describing the DOM element I want it to create; 1st argument: HTML tag of the DOM element
            'data-coffee-order': 'checkbox', //2nd argument: object that specifies the attributes that jQuery should add to the <div>
            'class': 'checkbox'
        });

        var $label = $('<label></label>');

        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress //By setting the value to the customer's email address, you are associating the checkbox with the customer's coffee order
        });

        var description = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }

        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x]';

        $label.append($checkbox); //append method connects the elements together
        $label.append(description); //This method accepts either a DOM element or a jQuery-wrapped collection and adds it as a child element 
        $div.append($label);

        this.$element = $div; //Makes the subtree available as a property of the instance by assigning it to this.$element
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);