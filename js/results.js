//KEEP RESULTS
var lstResults = document.getElementById('results');
function showResults() {
  var results = JSON.parse(localStorage.getItem('results'));
  for (var i = 0; i < results.length; i += 1) {
    var listScores = document.createElement('li');
    listScores.textContent = [i+1] + ".- " + results[i].name + ' : ' + results[i].score;
    lstResults.appendChild(listScores);
  }
}

//DELETE RESULTS WHEN BTN DELETE IS CLICK
var deleteBtn = document.getElementById('delete');
deleteBtn.onclick = deleteRecord;
showResults();

function deleteRecord() {
  localStorage.removeItem('results');
location.reload();
}

