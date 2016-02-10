/*
 Drill application using Meteor platform.

 */
if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);
    Meteor.call('generateNumber');

    Template.body.helpers({
       answered: function(){
           return Session.equals('answered',0);
       }
    });

    Template.Response.helpers({
        response: function () {
            return Session.get('response');
        },
        counter: function () {
            return Session.get('counter');
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
                    } else
                    { Session.set('response', t.text);
                      Session.set('answered', t.answer);
                    }
                });
                e.target.value = "";
            }
        }
    });

    Template.askForNewGame.events({
        'click #playAgain' : function(){
            window.location.href='.';
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {

        // code to run on server at startup
    });
 var number;
    Meteor.methods({
        generateNumber: function () {
            number = Math.floor(Math.random() * 100) + 1;
 //           console.log(number);
        },
        feedback: function (guess) {
            var response={};
            if (number > guess) {
                response.text = 'too low';
                response.answer = 1;
            } else if (number < guess) {
                response.text = 'too high';
                response.answer = -1;
            } else if (number === guess) {
                response.text = "correct!";
                response.answer = 0;
            }

            return response;
        }
    });
}
