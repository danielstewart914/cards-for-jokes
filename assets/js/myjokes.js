//TODO - Get jokes from local storage (Created dummy array for now)
var jokesArray = ["Joke1" , "Joke2" , "Joke3" , "Joke4"];

var rootEl = $('#joke-container');

for (var iter = 0; iter < jokesArray.length; iter++) {

    if ( iter % 3 == 0 ) {
        var rowEl = $('<div>');
        rowEl.attr('class','row');
        rootEl.append(rowEl);
    }

    var columnEl = $('<div>');
    columnEl.attr('class','col s4');
    rowEl.append(columnEl);

    var cardEl = $('<div>');
    cardEl.attr('class', 'card');
    cardEl.attr('id', 'joke-box');
    columnEl.append(cardEl);

    var cardImageEl = $('<div>');
    cardImageEl.attr('class' , 'card-image waves-effect waves-block waves-light');
    cardEl.append(cardImageEl);

    var imageEl = $('<img>');
    imageEl.attr ('class', 'activator');
    imageEl.attr ('src' , '/assets/images/binary.jpeg');
    cardImageEl.append(imageEl);

    var cardContentEl = $('<div>');
    cardContentEl.attr('class' , 'card-content');
    cardEl.append(cardContentEl);

    var spanEl = $('<span>');
    spanEl.attr('class' , 'card-title grey-text text-darken-4');
    cardContentEl.append(spanEl)

    var iconEl = $('<i>');
    iconEl.attr('class' , 'material-icons right');
    iconEl.text('more_vert');
    spanEl.append(iconEl);

    var cardRevealEl = $('<div>');
    cardRevealEl.attr('class' , 'card-reveal');
    cardEl.append(cardRevealEl);

    var spanRevealEl = $('<span>');
    spanRevealEl.attr('class' , 'card-title grey-text text-darken-4');
    cardRevealEl.append(spanRevealEl)

    var iconRevealEl = $('<i>');
    iconRevealEl.attr('class' , 'material-icons right');
    iconRevealEl.text('close');
    spanRevealEl.append(iconRevealEl);

    var jokeContentEl = $('<p>');
    jokeContentEl.text(jokesArray[iter]);
    cardRevealEl.append(jokeContentEl);
}