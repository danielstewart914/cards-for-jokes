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


//  shuffle deck
async function shuffleDeck ( id ) {

    return fetch ( `${ deckOfCardApiRootUrl }/${ id }/shuffle/` )
      .then ( function ( response ) {
        if ( response.ok ) {
    
          return response.json();
    
        }
    
        else {
    
          console.error( 'Error: ' + response.statusText );
    
        }
    
      } ) 
    
    }

// draw card  
async function drawCard( numberOfCards ) {

    return fetch ( `${ deckOfCardApiRootUrl }/${ deckId }/draw/?count=${ numberOfCards }` )
    .then ( function ( response ) {

        if ( response.ok ) {

        return response.json();
    
        }
    
        else {
    
        console.error( 'Error: ' + response.statusText );
    
        }

    } )


}

// render bottom row of cards  
function renderRow () {

    shuffleDeck( deckId )
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

renderRow();