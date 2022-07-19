var centerThemeCard = $('#center-theme');
var userCardEl = $('#user-card');
var computerCardEl = $('#computer-card');
var hilariousEl = $('#hilarious')
var jokeModal = $( '#jokeModal' );
var jokeBoxEl = $( '#jokeBox' );
var score = 0;

  function determineWinner(user_val, comp_val, remaining) {

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
      endGame(remaining);
    } else if(user_val > comp_val ) {
      jokeBoxEl.html('');
      jokeModal.modal( 'open' );
      localStorage.setItem("score", JSON.stringify(score +=user_val));
      getJoke().then( function(data) {
        if (data.type = 'single' && data.joke) {

          jokeBoxEl.html( data.joke );

          // save joke as object with type 1 and unique id
          currentJoke = { type: 1, id: data.id, joke: data.joke };

        } else {

          jokeBoxEl.html( `<p>${data.setup}</p><p>${data.delivery}</p>` );

          // save joke as object with type 2 and unique id
          currentJoke = { type: 2, id: data.id, setup: data.setup, delivery: data.delivery };
        }
        hilariousEl.off("click").on('click', function(event) {
          event.preventDefault();
          saveJoke();
        });
      }).then(function() {
        endGame(remaining);
      });
    } else {
      endGame(remaining);
    }
  }

centerThemeCard.on('click', function(event) {
  event.preventDefault();
  drawCard(2).then(function(data) {
    userCardEl.css('background-image', 'url('+ data.cards[0].image+')');
    computerCardEl.css('background-image', 'url('+ data.cards[1].image+')');
  
    // Determine who is the winner
    determineWinner(data.cards[0].value,data.cards[1].value, data.remaining);
  });
});

function saveHighScores() {
  // store multiple objects in an array, this will help with storing all of your highscore objects together
  var username = localStorage.getItem("user_name");
  var score = localStorage.getItem("score");

  var highscore = {
    username: username,
    score: score
  }
  localStorage.setItem("userScores", JSON.stringify(highscore))

  // render all previously saved highscores to the highscore page (put this in highscores.js)
    // parse the userScores data from localStorage, map function to go through each object in LS and create a table line for each username/score combo
  }
  
  function endGame(remaining) {
  // save new highscore object to localStorage at the end of each game
  saveHighScores()
  if (remaining == 0){

    $( '.game-play' ).addClass( 'hidden' );

    var gameEndDiv = $('#game-end');
    gameEndDiv.attr('class', 'game-over')
    var newDiv = $('<div>');
    var newPara = $('<p>');
    newPara.attr('class', 'label center-align')
    newPara.text('Game Over');
    newDiv.append(newPara);

    var scorePara = $('<p>');
    scorePara.attr('class', 'label center-align')
    scorePara.text('Your score is: ' +score);
    newDiv.append(scorePara);

    var gameEndMessage = $('<p>').text("Visit the High Scores page to view your score!");
    gameEndMessage.attr("class", "label center-align")
    newDiv.append(gameEndMessage);

    var restartButton = $('<button>');
    restartButton.attr('class', 'restart-btn waves-effect waves-light btn brown darken-4 white-text');
    restartButton.text('Restart Game');
    restartButton.on('click', function(event) {
      event.preventDefault();
      location.reload();
    });
    newDiv.append(restartButton);

    gameEndDiv.append(newDiv);

  }
}


