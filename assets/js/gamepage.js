
//Card retrieval
var centerThemeCard = $('#center-theme');
var userCardEl = $('#user-card');
var computerCardEl = $('#computer-card');


centerThemeCard.on('click', function(event) {
    event.preventDefault();
        drawCard(2).then(function(data) {
          console.log(data);
          userCardEl.css('background-image', 'url('+ data.cards[0].image+')');
          computerCardEl.css('background-image', 'url('+ data.cards[1].image+')');
  
          // Determine who is the winner
          determineWinner(data.cards[0].value,data.cards[1].value);
        });
      });

  function determineWinner(user_val, comp_val) {

    var cards_value = {
      'KING' : 13,
      'QUEEN' : 12,
      'JACK' : 11,
      'ACE' : 0
    };
  
    if (cards_value[user_val] !== undefined){
      user_val = cards_value[user_val];
    }
  
    if (cards_value[comp_val] !== undefined){
      comp_val = cards_value[comp_val];
    }
  
    user_val = parseInt(user_val);
    comp_val = parseInt(comp_val);
  
    if(user_val == comp_val){
      console.log("Nobody wins");
    } else if(user_val > comp_val ) {
      console.log("Userwins");
      getJoke();
    } else {
      console.log("Computer wins");
    }
}


//On loading the game page get Deck_ID

getNewDeck(1).then( function(data) {
  deckId = data.deck_id;
  console.log(deckId);
  shuffleDeck(deckId) });