// clear scores when clear scores button is clicked
$( '#clear-scores' ).on( 'click', function() {

  localStorage.removeItem( 'scoreBoard' );

  location.reload();

} );

if (localStorage.getItem("scoreBoard")){

  var highScores = JSON.parse(localStorage.getItem("scoreBoard"));
  console.log(highScores)

  highScores.map(({name,score})=>{
    console.log(name,score)
  document.getElementById("highScores").innerHTML+=
  `
  <tbody>
    <tr>
      <td>${name}</td>
      <td>${score}</td>
    </tr>
  </tbody>
  `
  })
}
