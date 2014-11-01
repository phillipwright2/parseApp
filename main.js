/**
 * Created by phillipwright on 10/31/14.
 */
$(function(){
    Parse.initialize("2ziyMSwbwJGCOB9ki2LmJg4fzEjdTdTWAdVDCcWg",
        "aCX8GLd9mws9Clmo0jSrA432xc9zDL9ZtsB3nEBh");

    function addContact(name, email, successCb) {
        var Contact = Parse.Object.extend("Contact");
        var contact = new Contact();
        var parsePromise = contact.save({name: name, email: email})

        parsePromise.then(successCb, function(error) {
            alert("could not save record");
        });
    }

    // when the button is clicked
    // read the name and email values
    // call the addContact() with those values

    $("form").on("submit", function() {
        var contactName = $("input[name=name]").val();
        var contactEmail = $("input[name=email]").val();

        var onSuccess = function() {
            resetForm($("form")[0]);
            console.log("Booyaa");
            },

        addContact(contactName, contactEmail, onSuccess);
        return false;
    });

    function resetForm(formElement) {
        formElement.reset();
    }
    loadContacts = function(){
        console.log(' Loading from Parse');
    };


    var Contacts = Parse.Object.extend("Contacts");
    var query = new Parse.Query(Contacts);
    query.find({
        success: function (results) {
            var newLIs = results.map(function (element) {
                return $("<li>", { text: element.attributes.name + ": " + element.attributes.email});
            });
        },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
    if ($("ul#list"[0])){
         loadContacts();
    };
});