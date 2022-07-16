//Get Jokes from Local Storage

myJokes =  localStorage.getItem('jokes') || "[]";
myJokes = JSON.parse(myJokes);

var rootEl = $('#joke-container');

var rowEl = $('<div>');
rowEl.attr('class','row');
rootEl.append(rowEl);

for (var iter = 0; iter < myJokes.length; iter++) {

    var columnEl = $('<div>');
    columnEl.attr('class','col s12 m4 l3');
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
    imageEl.attr ('src' , './assets/images/binary.jpeg');
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
    jokeContentEl.text(myJokes[iter]);
    cardRevealEl.append(jokeContentEl);
}