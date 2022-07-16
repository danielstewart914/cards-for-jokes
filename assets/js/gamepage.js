var centerThemeCard = $('#center-theme');
var userCardEl = $('#user-card');
var computerCardEl = $('#computer-card');
var jokeModal = $( '#jokeModal' );
var jokeBoxEl = $( '#jokeBox' )
var score = 0;

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
      console.log("Nobody Wins");
    } else if(user_val > comp_val ) {
      console.log("User Wins");
      jokeBoxEl.html('');
      jokeModal.modal( 'open' );
      score +=10;
      getJoke().then( function(data) {
        if (data.type = 'single' && data.joke) {
          console.log(data.joke);
          jokeBoxEl.html( data.joke );
          currentJoke = data.joke;
        } else {
          console.log(data.setup + data.delivery)
          jokeBoxEl.html( `<p>${data.setup}</p><p>${data.delivery}</p>` );
          currentJoke = data.setup + data.delivery;
        }
        saveJoke();
      })
    } else {
      console.log("Computer wins");
    }
  }

centerThemeCard.on('click', function(event) {
  event.preventDefault();
  drawCard(2).then(function(data) {
    userCardEl.css('background-image', 'url('+ data.cards[0].image+')');
    computerCardEl.css('background-image', 'url('+ data.cards[1].image+')');
  
    // Determine who is the winner
    determineWinner(data.cards[0].value,data.cards[1].value);
    if (data.remaining == 0) {
      // TODO: save score to local storage

      // end game - can be changed to a modal later.
      alert("Your score is: " + score);
      // Go to highscore page
      window.location = 'highscores.html';
    }

  });
});