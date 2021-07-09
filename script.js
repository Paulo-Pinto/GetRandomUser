let old_colour = "info";
let colour = "info";
let colours = [
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    // "light", cant see white on white
    "dark"
]

// get the first user when dom is loaded
$(document).ready(function () {
    get_new_user()
    // get the first colour to change
    new_colour()
});

// get new user when New User button is called
$("#new_user").click(function () {
    get_new_user();
});

// change colours
$("#change_colour").click(function () {
    // get all ids (*) from tags that have an id and class (map), to array (.get)
    var IDs =
        $("*")
        .map(function () {
            if (this.className != "" && this.id != "") return this.id;
        })
        .get();

    // change colour 1 by 1:
    IDs.forEach(id => {
        switch_colour(id, colour);
    });

    // change next colour
    new_colour();
});

function get_new_user() {
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function (data) {
            display(data.results[0]);
        },
        error: function (xhr, status, error) {
            alert("didnt work?");
        }
    });
}

function display(user) {
    // populate values
    $("#name").html(user.name.first + " " + user.name.last);
    $("#username").html(user.login.username);
    $("#email").html(user.email);
    $("#location").html(user.location.city);
    $("#user_image").attr("src", user.picture.large);

    // TODO : create slider to show age
    $("#age").html(user.dob.age);

    // un-hide element
    $("#user").removeAttr('hidden');

    // TODO : display timezone in map?
    // console.log(user.location.timezone.description) 
}

function new_colour() {
    // switch the old_colour
    old_colour = colour;

    // gen new colour
    do {
        colour = colours[Math.floor(Math.random() * colours.length)];
    }
    while (colour == old_colour);

    // change the Next Colour button's text and border colour
    $("#change_colour").addClass("text-" + colour).removeClass("text-" + old_colour);
    $("#change_colour").addClass("border-" + colour).removeClass("border-" + old_colour);
}

function switch_colour(class_id, colour) {

    class_id = "#" + class_id;
    classes = $(class_id).attr("class");

    // dont change the change colour button, since it represents the next colour
    if (classes != undefined && class_id != "#change_colour") {

        let class_prefixes = ["text", "bg", "border", "btn"]

        class_prefixes.forEach(prefix => {
            // change iteratively -> text-colour, bg-colour etc.
            if (classes.indexOf(prefix) != -1) {
                $(class_id).addClass(prefix + "-" + colour).removeClass(prefix + "-" + old_colour);
            }
        });
    }
}