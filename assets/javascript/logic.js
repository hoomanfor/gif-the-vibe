
var vibes = ["Positive", "Grinning", "Beaming", "Joy", "Winking", "Smiling", "Star-Struck", "Zany", "Squinting", "Hugging", "Shushing", "Thinking", "Neutral", "Expressionless", "Smirking", "Unamused", "Relieved", "Pensive", "Sleepy", "Shy", "Partying", "Nerdy", "Confused", "Worried", "Astonished", "Flushed", "Pleading", "Fearful", "Tired", "Evil", "Interested", "Hopeful", "Kindness", "Cheerfulness", "Confidence", "Admiration", "Enthusiasm", "Euphoria", "Satisfaction", "Pride", "Contentment", "Inspired"];

var key = "1hpEc8I1eklOKDKC885JqonMveeNVSS3";
var offset = 0;
priorVibe = "";

function displayGifs(query) {
    $.ajax({
        url: query,
        method: "GET"
    }).then(function(response) {
        var gifsArr = response.data;
        console.log(gifsArr);
        gifsArr.forEach(function(element){
            var animatedURL = element.images.fixed_width_small.url;
            var stillURL = element.images.fixed_width_small_still.url;
            var gifImg = $("<img>");
            gifImg.attr("src", animatedURL);
            gifImg.attr("data-state", "animated");
            gifImg.attr("still-url", stillURL);
            gifImg.attr("animated-url", animatedURL)
            $("#gifs").append(gifImg);
        })
    })
}

vibes.forEach(function(element) {
    var vibeBtn = $("<button type='button' class='btn btn-primary m-1'>");
    vibeBtn.text(element);
    $("#vibes").append(vibeBtn);
})

$(document).on("click", "button[type|='button']", function(event) {
    $("#gifs").empty();
    var vibeText = $(this).text();
        if (priorVibe === vibeText) {
            offset += 10;
        } else {
            offset = 0;
            priorVibe = vibeText;
        }
    var query = "https://api.giphy.com/v1/gifs/search?q=" + vibeText + "&limit=10&offset=" + offset + "&api_key=" + key;
    displayGifs(query)
})

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


