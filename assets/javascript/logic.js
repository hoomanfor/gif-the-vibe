
var vibes = ["Positive", "Grateful", "Happy", "Negative", "Motivated", "Excited", "Weird", "Enthusiastic", "Inspired", "Relieved", "Sleepy", "Confused", "Worried", "Astonished", "Flushed", "Tired", "Interested", "Hopeful", "Cheerful", "Confident"];

var key = "1hpEc8I1eklOKDKC885JqonMveeNVSS3";
var offset = 0;
priorVibe = "";
var favorites = [];

function displayGifs(query) {
    $("#gifs").removeClass("d-none");
    $.ajax({
        url: query,
        method: "GET"
    }).then(function(response) {
        var gifsArr = response.data;
        console.log(gifsArr);
        gifsArr.forEach(function(element){
            var gifDiv = $("<div class='col p-1 text-center border-bottom border-right border-left border-secondary'>")
            var animatedURL = element.images.fixed_width.url;
            var stillURL = element.images.fixed_width_still.url;
            var srcURL = element.images.original.url;
            var title = element.title;
            var titleP = $("<p class='m-0 text-light'>");
            titleP.html(title);
            var favBtn = $('<button type="button" class="btn btn-secondary btn-sm m-1" id="favorite-btn">');
            favBtn.attr("animated-url", animatedURL);
            favBtn.attr("title", title);
            favBtn.text("Add to Favorites")
            var gifImg = $("<img class='gifs'>");
            gifImg.attr("src", stillURL);
            gifImg.attr("data-state", "still");
            gifImg.attr("still-url", stillURL);
            gifImg.attr("animated-url", animatedURL);
            gifDiv.append(favBtn, gifImg, titleP, );
            $("#gifs").prepend(gifDiv);
        })
    })
}

function displayVibes() {
    $("#vibes").empty();
    vibes.forEach(function(element) {
        var vibeBtn = $("<button type='button' id='vibe-btn' class='btn btn-primary m-1'>");
        vibeBtn.text(element);
        $("#vibes").append(vibeBtn);
    });
}
displayVibes()

$(document).on("click", "#vibe-btn", function(event) {
    $("#instruction").removeClass("d-none");
    var vibeText = $(this).text();
        if (priorVibe === vibeText) {
            offset += 10;
        } else {
            offset = 0;
            priorVibe = vibeText;
        }
    var query = "https://api.giphy.com/v1/gifs/search?q=" + vibeText + "&limit=10&offset=" + offset + "&api_key=" + key;
    displayGifs(query)
});

$(document).on("click", "img", function(event) {
    var state = $(this).data("state");
    var still = $(this).attr("still-url")
    var animated = $(this).attr("animated-url")
    if (state === "animated") {
        $(this).data("state", "still")
        $(this).attr("src", still);
    }
    if (state === "still") {
        $(this).data("state", "animated")
        $(this).attr("src", animated);
    }
});

$(document).on("click", "#add", function(event) {
    event.preventDefault();
    var newVibe = $("#new-vibe").val().trim();
    $("#new-vibe").val("")
    console.log(newVibe);
    vibes.push(newVibe);
    displayVibes()
});

$(document).on("click", "#favorite-btn", function(event) {
    $(this).removeClass("btn-secondary");
    $(this).text("Added");
    $(this).addClass("btn-success");
    $(this).attr("disabled", "true");
    var fObject = {
        animated_url: $(this).attr("animated-url"),
        title: $(this).attr("title")
    }
    favorites.push(fObject);
    $("#fav-count").text(favorites.length);
    console.log(favorites);
});

$(document).on("click", "#view-favorites", function(event) {
    $("#gifs").addClass("d-none");
    $("#instruction").addClass("d-none");
    favorites.forEach(function(element) {
        var gifDiv = $("<div class='col p-1 text-center border-bottom border-right border-left border-secondary'>");
        var animatedURL = element.animated_url;
        var title = element.title;
        var gifImg = $("<img class='gifs'>");
        gifImg.attr("src", animatedURL);
        var titleP = $("<p class='m-0 text-light'>");
        titleP.html(title);
        gifDiv.append(gifImg, titleP);
        $("#favorites").append(gifDiv);
    }); 
});


