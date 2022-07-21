var bottomCardRowEl = $( '#bottomCardRow' );
var deckOfCardApiRootUrl = 'https://deckofcardsapi.com/api/deck';
var deckId = JSON.parse( localStorage.getItem( 'deck_id' ) ) || {};
var documentRootEl = $( ':root' );

// user settings
var userName = localStorage.getItem( 'user_name' );
var themeIndex =  localStorage.getItem( 'deck_theme' );

const themes = [ 
  'https://deckofcardsapi.com/static/img/back.png', 
  './assets/images/batman-deck-theme.jpg', 
  './assets/images/awkward-turtle-deck-theme.jpg', 
  './assets/images/mountain-deck-theme.jpg', 
  './assets/images/humming-bird-deck-theme.jpg', 
  './assets/images/mountain-deck-theme-2.jpg',
  './assets/images/jokercard.jpeg'
];

// index.html elements
var highCardGameEl = $( '#highCardGame' );
var userModal = $( '#user-modal' );
var playGameElButton = $( '#play-game' );
var welcomeDisplayEl = $( '#welcome-display' );
var saveUserSettingsButtonEl = $( '#save-user-settings' );
var changeUSerSettingsButtonEl = $( '#change-user-settings' );
var userNameDisplayEl = $( '#user-name' );
var usernameEntryEl = $( '#username-entry' );
var nameEntryErrorEl = $( '#name-entry-error' );
var themeDisplayEl = $( '#theme-display' );

//  joke variables
var jokeAPIUrl ='https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=1';
var currentJoke;
var myJokes= [];

// save jokes to local storage
function saveJoke(){

  // if joke is already saved return out of function
  var jokeIndex = myJokes.findIndex( jokes => jokes.id === currentJoke.id );
  if ( jokeIndex >= 0 ) return;

  // push current joke to joke array and save to local storage
  myJokes.push(currentJoke);
  localStorage.setItem("jokes", JSON.stringify(myJokes));

}

// load jokes from local storage
function loadJokesJSON(){
  var jokesJSON = localStorage.getItem("jokes");
  myJokes = JSON.parse(jokesJSON);
}

// initialize modals on all pages where main.js is loaded
$(document).ready(function(){
  $('.modal').modal();
});

// initialize sidenav
$(document).ready(function () {
  $(".sidenav").sidenav();
});

// returns true if time stamp is older than two weeks
function isTimeStampOlderThanTwoWeeks ( timeStamp, now) {
  
  // get the difference between timestamp and now
  var difference = now.diff( luxon.DateTime.fromISO( timeStamp ) );

  // if the timestamp is older than two weeks get a new on
  if( difference.as( 'weeks' ) > 2 ) return true;

  return false;

}

// initialize data
function initialize () {

  // if there is a joke stored load jokes into joke array
  if (localStorage.getItem("jokes")){
    loadJokesJSON();
  }
  // if there is a user name show welcome element
  if ( userName ) {

    welcomeDisplayEl.removeClass( 'invisible' );
    userNameDisplayEl.text( userName );

  }

  if ( themeIndex !== null ) {

    // if there is a them selected add highlight to selected theme card
    userModal.children().children().children( 'img' ).eq( themeIndex ).addClass( 'selected-theme' );
    themeDisplayEl.attr( 'src',  themes[ themeIndex ] );
    changeTheme();

  }

  // if deckId is old format or older than two weeks get new deck_id
  if ( !deckId.id || isTimeStampOlderThanTwoWeeks( deckId.timeStamp , luxon.DateTime.now() ) ) {

    getNewDeck( 1 )
    .then ( function (  data ) {

      const newId = data.deck_id;
      const timeStamp = luxon.DateTime.now();

      deckId = {
        id: newId,
        timeStamp: timeStamp

      }

      localStorage.setItem( 'deck_id', JSON.stringify( deckId ) );

      renderBottomRow();

      } );

      } else {

      renderBottomRow();

      }

}

function changeTheme () {

  if ( themeIndex > 0 ) {

     documentRootEl.css( '--cardThemeUrl', `url( '../.${ themes[ themeIndex ] }' )` );
  
  } else {

    documentRootEl.css( '--cardThemeUrl', `url( '${ themes[ themeIndex ] }' )` );

  }
  

}

// Get Joke from Joke API
async function getJoke() {
  const response = await fetch(jokeAPIUrl);
  if (response.ok) {
    return response.json();
  } else {
    console.error( 'Error: ' + response.statusText );
  } 
}


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

  const response = await fetch( `${ deckOfCardApiRootUrl }/${ deckId.id }/draw/?count=${ numberOfCards }` );

  if ( response.ok ) {

    return response.json();

  } else {

    console.error( 'Error: ' + response.statusText );

  }

}

// render bottom row of cards on main screen
function renderBottomRow () {

  // first shuffle deck
  shuffleDeck( deckId.id, false )
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
      shuffleDeck(deckId.id, false);
    })

  } );

}

function saveUserName() {

  if ( usernameEntryEl.val() ) userName = usernameEntryEl.val();

  if ( themeIndex === null ) {
    
    themeIndex = 6;
    localStorage.setItem( 'deck_theme', themeIndex );
  }

  localStorage.setItem( 'user_name', userName );

}

initialize();


highCardGameEl.on( 'click', function( event ) {

  event.preventDefault();

  if( userName ) location.href = 'gamepage.html';

  else {
    
    playGameElButton.removeClass( 'hidden' );
    saveUserSettingsButtonEl.addClass( 'hidden' );
    userModal.modal( 'open' );

  }

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

  themeDisplayEl.attr( 'src',  themes[ themeIndex ] );
  changeTheme();

} );

// when play game button is clicked
playGameElButton.on( 'click', function() {

    // if no user name entered
    if ( !usernameEntryEl.val() ) {

      nameEntryErrorEl.text( 'Please enter a name!' );
      
      return;
    
    }

  saveUserName();

  location.href = 'gamepage.html';

} );

// open modal with save button
changeUSerSettingsButtonEl.on( 'click', function () {

  playGameElButton.addClass( 'hidden' );
  saveUserSettingsButtonEl.removeClass( 'hidden' );
  userModal.modal( 'open' );

} );

//  save user settings
saveUserSettingsButtonEl.on( 'click', function() {

  saveUserName();

  userNameDisplayEl.text( userName );

  userModal.modal( 'close' );

} );
