if (localStorage.getItem("highScores")){

  var highScores = JSON.parse(localStorage.getItem("highScores"));
  console.log(highScores)

  for(var i=0; i<highScores.length; i++){

      document.getElementById('highScores').innerHTML+=
      `
        <tbody>
          <tr>
            <td>${i+1}</td>
            <td>${highScores[i].name}</td>
            <td>${highScores[i].score}</td>
          </tr>
        </tbody>
      `

  }

}