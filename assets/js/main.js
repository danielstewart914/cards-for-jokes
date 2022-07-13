var bottomCardRowEl = $( '#bottomCardRow' );
var deckOfCardApiRootUrl = 'https://deckofcardsapi.com/api/deck';
var deckId = JSON.parse( localStorage.getItem( 'deck_id' ) );


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