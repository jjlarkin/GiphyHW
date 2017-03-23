/****************************************************************
 James Larkin

 Giphy
 ***********************************************************************/


var animals = ["Cat", "Dog", "Bird"];

function displayAnimalInfo() {

    var animal = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +"funny "+
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div class='animal'>");

            var rating = results[i].rating;

            var pOne = $("<p>").text("Rating: " + rating);

            animalDiv.append(pOne);

            var animalImage = $("<img>");

            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("class", "gif");
            animalDiv.append(animalImage);

            $("#gifs-appear-here").prepend(animalDiv);

        }
    });

}

function renderButtons() {


    $("#buttons-view").empty();

    for (var i = 0; i < animals.length; i++) {

        var a = $("<button>");

        a.addClass("animal");

        a.attr("data-name", animals[i]);

        a.text(animals[i]);

        $("#buttons-view").append(a);
    }
}



$("#add-animal").on("click", function(event) {
    event.preventDefault();

    var animal = $("#animal-input").val().trim();


    animals.push(animal);


    renderButtons();
});

$(document).on("click",".gif", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#buttons-view").on("click", ".animal", displayAnimalInfo);


renderButtons();

