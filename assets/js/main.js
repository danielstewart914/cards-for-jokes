var bottomCardRowEl = $( '#bottomCardRow' );
var deckOfCardApiRootUrl = 'https://deckofcardsapi.com/api/deck';
var deckId = JSON.parse( localStorage.getItem( 'deck_id' ) );

// user settings
var userName = localStorage.getItem( 'user_name' );
var themeIndex =  localStorage.getItem( 'deck_theme' );

const themes = [ 'https://deckofcardsapi.com/static/img/back.png', './assets/images/batman-card-theme.jpeg', './assets/images/awkward-turtle-card-theme.jpg', './assets/images/mountain-card-theme.jpg', './assets/images/humming-bird-card-theme.jpg', '' ];

// index.html elements
var highCardGameEl = $( '#highCardGame' );
var userModal = $( '#user-modal' );
var playGameElButton = $( '#play-game' );
var usernameEntryEl = $( '#username-entry' );
var nameEntryErrorEl = $( '#name-entry-error' );

//  joke variables
var jokeAPIUrl ='https://v2.jokeapi.dev/joke/Programming';
var saveJokeJSON = localStorage.getItem('joke');
var myJokes= [];
console.log(myJokes);


// initialize modals on all pages where main.js is loaded
$(document).ready(function(){
  $('.modal').modal();
});

// initialize sidenav
$(document).ready(function () {
  $(".sidenav").sidenav();
});

// initialize data
function initialize () {

  if( !deckId ) {

    getNewDeck( 1 )
    .then ( function (  data ) {

      deckId = data.deck_id;
      localStorage.setItem( 'deck_id', JSON.stringify( deckId ) );

      renderBottomRow();

    } );

  } else {

    renderBottomRow();

  }

}

// Get Joke from Joke API
function getJoke() {
  fetch(jokeAPIUrl)
  .then(function (response) {
      response.json().then(function (data) {
        console.log(data);

      });
    });
}

// Save joke to local storage
function saveJokeJSON() {
  localStorage.setItem('joke', JSON.stringify('joke'));
} 
saveJokeJSON ()
// get joke from local storage
function jokeHistory() {
  return localStorage.getItem('joke');
}
console.log(jokeHistory());

// get new deck
async function getNewDeck( deckCount ) {

  const response = await fetch(`${ deckOfCardApiRootUrl }/new/shuffle/?deck_count=${ deckCount }`);

  if (response.ok) {

    return response.json();

  } else {

    console.error( 'Error: ' + response.statusText );

  } 

}


// shuffle deck
async function shuffleDeck ( id, onlyRemaining ) {

  const response = await fetch( `${ deckOfCardApiRootUrl }/${ id }/shuffle/?remaining=${ onlyRemaining }` );

  if ( response.ok ) {

    return response.json();

  } else {

    console.error( 'Error: ' + response.statusText );

  } 
    
    }

// draw card(s) 
async function drawCard( numberOfCards ) {

  const response = await fetch( `${ deckOfCardApiRootUrl }/${ deckId }/draw/?count=${ numberOfCards }` );

  if ( response.ok ) {

    return response.json();

  } else {

    console.error( 'Error: ' + response.statusText );

  }

}

// render bottom row of cards on main screen
function renderBottomRow () {

  // first shuffle deck
  shuffleDeck( deckId, false )
    .then ( function () {

    // draw all cards
    drawCard( 52 )
    .then ( function ( data ) {

      var rowFrag = $( document.createDocumentFragment() );

      // render cards to fragment
      for( var i = 0; i < data.cards.length; i++ ) {

          var cardImageEl = $( '<img>' ).attr( 'src', data.cards[i].image );
          rowFrag.append( cardImageEl );
  
      }

      // set contents of with bottom row element with fragment
      bottomCardRowEl.html( rowFrag );

    } ).then( function() {
      shuffleDeck(deckId, false);
    })

  } );

}

initialize();

highCardGameEl.on( 'click', function( event ) {

  event.preventDefault();

  if( userName ) location.href = 'gamepage.html'
  else userModal.modal( 'open' );

} );

// when you click on an image element in the modal ( themes )
userModal.on( 'click', 'img', function ( event ) {

  // theme that was clicked 
  var themeSelection = $( event.target );

  // everything else
  var otherThemes = userModal.children().children().children( 'img' ).not( themeSelection );

  // add highlight class and remove from others
  themeSelection.addClass( 'selected-theme' );
  otherThemes.removeClass( 'selected-theme' );

  // set theme index to value store in img element
  themeIndex = parseInt( themeSelection.data( 'theme' ) );
  localStorage.setItem( 'deck_theme', themeIndex );

} );

// when play game button is clicked
playGameElButton.on( 'click', function() {

  // if no user name entered
  if ( !usernameEntryEl.val() ) {

    nameEntryErrorEl.text( 'Please enter a name!' );
    
    return;
  
  }

  userName = usernameEntryEl.val();

  if ( !themeIndex ) themeIndex = 0;

  localStorage.setItem( 'user_name', userName );

  location.href = 'gamepage.html';

} );