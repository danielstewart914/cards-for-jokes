var rootEl = $('#joke-container');

/*
Render jokes from local storage in a grid layout
*/
function renderJokes() {

    // Create a row in the grid layout to display jokes
    var jokesFrag = $( document.createDocumentFragment() );
    var rowEl = $('<div>');
    rowEl.attr('class','row');
    jokesFrag.append(rowEl);

    for (var iter = 0; iter < myJokes.length; iter++) {

        // Create a column in a grid for each joke
        var columnEl = $('<div>');
        columnEl.attr('class','col s12 m6 l4');
        rowEl.append(columnEl);

        // Card element from materialize
        var cardEl = $('<div>');
        cardEl.attr('class', 'card');
        cardEl.attr('id', 'joke-box');
        columnEl.append(cardEl);

        var cardImageEl = $('<div>');
        cardImageEl.attr('class' , 'card-image waves-effect waves-block waves-light');
        cardEl.append(cardImageEl);

        // Add image to the card which when clicked opens the joke
        var imageEl = $('<img>');
        imageEl.attr ('class', 'activator');
        imageEl.attr ('src' , './assets/images/binary.jpeg');
        cardImageEl.append(imageEl);

        // Add content to the card
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

        // To reveal the contents of the joke
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
        if ( myJokes[iter].type === 1 ) jokeContentEl.text(myJokes[iter].joke);
        if ( myJokes[iter].type === 2 ) jokeContentEl.html( `<p>${ myJokes[iter].setup }</p><p>${ myJokes[iter].delivery }</p>` );
        
        // delete joke elements
        var deleteEl = $( '<div>' ).addClass( 'delete-joke' ).data( 'index', iter );
        var deleteIconEl = $( '<i>' ).addClass( 'material-icons right' ).text( 'cancel' ).data( 'index', iter );
        
        deleteEl.append( 'Delete ', deleteIconEl );
        jokeContentEl.append( deleteEl );

        cardRevealEl.append(jokeContentEl);
    }

    return jokesFrag;

}

rootEl.on( 'click', '.delete-joke', function( event ) {

    // get target
    var target = $( event.target );

    // splice out index of clicked joke
    myJokes.splice( target.data( 'index' ), 1 );

    // save to local storage
    localStorage.setItem("jokes", JSON.stringify(myJokes));

    // rerender jokes
    rootEl.html( renderJokes() );

} );

 rootEl.html( renderJokes() );