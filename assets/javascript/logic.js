
var vibes = ["Positive", "Grinning", "Beaming", "Joy", "Winking", "Kissing", "Smiling", "Star-Struck", "Zany", "Squinting", "Hugging", "Shushing", "Thinking", "Neutral", "Expressionless", "Smirking", "Unamused", "Relieved", "Pensive", "Sleepy", "Nauseated", "Hot", "Cold", "Woozy", "Partying", "Nerdy", "Confused", "Worried", "Astonished", "Flushed", "Pleading", "Fearful", "Tired", "Evil", "Interested", "Hopeful", "Kindness", "Cheerfulness", "Confidence", "Admiration", "Enthusiasm", "Euphoria", "Satisfaction", "Pride", "Contentment", "Inspired"];

vibes.forEach(function(element) {
    var vibeBtn = $("<button type='button' class='btn btn-primary m-1'>");
    vibeBtn.text(element);
    $("#vibes").append(vibeBtn);
})