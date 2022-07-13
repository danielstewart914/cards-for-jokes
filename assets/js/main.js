var bottomCardRowEl = $( '#bottomCardRow' );
var deckOfCardApiRootUrl = 'https://deckofcardsapi.com/api/deck';
var deckId = '0m34q6ubwk4g';

// initialize modal
$(document).ready(function(){
    $('.modal').modal();
  });

$(document).ready(function () {
  $(".sidenav").sidenav();
});

// get new deck
async function getNewDeck( deckCount ) {

  const response = await fetch(`${deckOfCardApiRootUrl}/new/shuffle/?deck_count=${deckCount}`);

  if (response.ok) {

    return response.json();

  }

  else {

    console.error('Error: ' + response.statusText);

  } 

}


// shuffle deck
async function shuffleDeck ( id, onlyRemaining ) {

  const response = await fetch(`${deckOfCardApiRootUrl}/${id}/shuffle/?remaining=${onlyRemaining}`);

  if (response.ok) {

    return response.json();

  }

  else {

    console.error('Error: ' + response.statusText);

  } 
    
    }

// draw card  
async function drawCard( numberOfCards ) {

  const response = await fetch(`${deckOfCardApiRootUrl}/${deckId}/draw/?count=${numberOfCards}`);

  if (response.ok) {

    return response.json();

  }

  else {

    console.error('Error: ' + response.statusText);

  }


}

// render bottom row of cards on main screen
function renderBottomRow () {

    shuffleDeck( deckId, false )
        .then ( function () {

        drawCard( 52 )
            .then ( function ( data ) {

            var rowFrag = $( document.createDocumentFragment() );

            for( var i = 0; i < data.cards.length; i++ ) {

                var cardImageEl = $( '<img>' ).attr( 'src', data.cards[i].image );
                rowFrag.append( cardImageEl );
        
            }

            bottomCardRowEl.html( rowFrag );

            })

        })

}

renderBottomRow();