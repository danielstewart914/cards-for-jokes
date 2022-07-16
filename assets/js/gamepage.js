var centerThemeCard = $('#center-theme');
var userCardEl = $('#user-card');
var computerCardEl = $('#computer-card');
var jokeModal = $( '#joke_modal' );
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
      jokeModal.modal( 'open' );
      score +=10;
      getJoke().then( function(data) {
        if (data.type = 'single') {
          console.log(data.joke);
          document.getElementById("jokeBox").innerHTML = data.joke;
        } else {
          console.log(data.setup + data.delivery)
          document.getElementById("jokeBox").innerHTML = data.setup + data.delivery;
        }
      })
    } else {
      console.log("Computer wins");
    }
  }

//Card retrieval
var centerThemeCard = $('#center-theme');
var userCardEl = $('#user-card');
var computerCardEl = $('#computer-card');

var score = 0;

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
      score += 10;
      getJoke().then( function(data) {
        // This does not work but why?
        if (data.type = 'single') {
          console.log(data.joke);
          document.getElementById("jokeBox").innerHTML = (data.joke)
        } else {
          console.log(data.setup + data.delivery)
          document.getElementById("jokeBox").innerHTML = (data.setup + data.delivery);
        }
      });
    } else {
      console.log("Computer wins");
    }
}