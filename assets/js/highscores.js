if (localStorage.getItem("userScores")){

  var highScores = JSON.parse(localStorage.getItem("userScores"));
  console.log(highScores)
  // instead of a for loop, need to use the map() method 
  for(var i=0; i<highScores.length; i++){

      document.getElementById('highScores').innerHTML+=
      `
        <tbody>
          <tr>
            <td>${i+1}</td>
            <td>${highScores[i].username}</td>
            <td>${highScores[i].score}</td>
          </tr>
        </tbody>
      `

  }

}