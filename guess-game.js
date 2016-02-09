/*
 Drill application using Meteor platform.

 */
if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);
    Meteor.call('generateNumber');

    Template.renderForm.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });


    Template.Response.helpers({
        response: function () {
            return Session.get('response');
        }
    });

    Template.renderForm.events({
        'keyup #guess': function (e) {
            if (e.which === 13) {
                Session.set('counter', Session.get('counter') + 1);
                var guess = Number(e.target.value);
                Session.set('guess', guess);
                Meteor.call('feedback', guess, function (e, t) {
                    if (e) {
                        console.log(e)
                    } else Session.set('response', t);
                });
                e.target.value = "";
            }
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });

    Meteor.methods({
        generateNumber: function () {
            number = Math.floor(Math.random() * 100) + 1;
            console.log(number);
        },
        feedback: function (guess) {
            var response;
            if (number > guess) {
                response = 'too low';
            } else if (number < guess) {
                response = 'too high';
            } else if (number === guess) {
                response = "correct!";
            }
            return response;
        }
    });
}
