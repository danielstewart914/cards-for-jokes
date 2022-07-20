// clear scores when clear scores button is clicked
$( '#clear-scores' ).on( 'click', function() {

  localStorage.removeItem( 'scoreBoard' );

  location.reload();

} );

if (localStorage.getItem("scoreBoard")){

  var highScores = JSON.parse(localStorage.getItem("scoreBoard"));
  highScores.map(({name,score})=>{
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
