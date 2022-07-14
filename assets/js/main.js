var bottomCardRowEl = $( '#bottomCardRow' );
var deckOfCardApiRootUrl = 'https://deckofcardsapi.com/api/deck';
var deckId = JSON.parse( localStorage.getItem( 'deck_id' ) );

// user settings
var userName = JSON.parse( localStorage.getItem( 'user_name' ) );
var themeIndex = JSON.parse( localStorage.getItem( 'deck_theme' ) );

const themes = [ 'https://deckofcardsapi.com/static/img/back.png', './assets/images/batman-card-theme.jpeg' ];

// index.html elements
var highCardGameEl = $( '#highCardGame' );
var userModal = $( '#user-modal' );
var playGameElButton = $( '#play-game' );
var usernameEntryEl = $( '#username-entry' );

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

// initialize modal
$(document).ready(function(){
  $('.modal').modal();
});

// initialize sidenav
$(document).ready(function () {
  $(".sidenav").sidenav();
});

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

    } )

  } );

}

initialize();

highCardGameEl.on( 'click', function() {

  if( userName ) location.href = 'gamepage.html'
  else userModal.modal( 'open' );

} );

userModal.on( 'click', 'img', function ( event ) {

  var themeSelection = $( event.target );
  var otherThemes = userModal.children().children().children( 'img' ).not( themeSelection );
  console.log( otherThemes );

  themeSelection.addClass( 'selected-theme' );
  otherThemes.removeClass( 'selected-theme' );

  themeIndex = parseInt( themeSelection.data( 'theme' ) );

} );

playGameElButton.on( 'click', function() {

  if ( !usernameEntryEl.val() ) return;

  userName = usernameEntryEl.val();

  if ( !themeIndex ) themeIndex = 0;


} );