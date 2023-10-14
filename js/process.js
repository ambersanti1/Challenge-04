//VARIABLES DEFINITION
//ELEMENTS RECOVERED FORM HTML
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('startBtn');
var nameEl = document.getElementById('name');
var instructionCoverEl = document.getElementById('instruction-cover');
var questionInTurn = 0; 
var time = 120; //TIME UNIT SECONDS
var setTimer;

//BEGIN THE QUIZ AFTER THE START BUTTON IS CLICKED
function beginQuiz() {
  instructionCoverEl.setAttribute('class', 'hide'); 
  questionsEl.removeAttribute('class'); 
  setTimer = setInterval(timer, 1000); //DEFINE SECONDS
  timerEl.textContent = time;
  showQuestion();
}
startBtn.onclick = beginQuiz;

function finishQuiz() {
  clearInterval(setTimer);
  var finishedCoverEl = document.getElementById('finished-cover'); 
  var finalScoreEl = document.getElementById('final-score'); 
  finishedCoverEl.removeAttribute('class'); 
  finalScoreEl.textContent = time; 
  questionsEl.setAttribute('class', 'hide');
}

function timer() {
  timerEl.textContent = time--;
  if (time <= 0) {
    finishQuiz();
  }
}

function showQuestion() { //TAKES QUESTION FROM QUESTIONS JS
  var Question = questions[questionInTurn]; 
  var noQuestionEl = document.getElementById('no-question'); 
  noQuestionEl.textContent = Question.noQuestion; 
  choicesEl.innerHTML = ''; 

  for (var i = 0; i < Question.choices.length; i++) { //CREATE BUTTONS FOR CHOICES
    // ADD BUTTON FOR EVERY CHOICE
    var choice = Question.choices[i];
    var choiceBtn = document.createElement('button');
    choiceBtn.setAttribute('class', 'choice');
    choiceBtn.setAttribute('value', choice);
    choiceBtn.textContent = choice;
    choicesEl.appendChild(choiceBtn);
  }
}

function clickChoice(event) {
  var buttonEl = event.target;
  if (buttonEl.value !== questions[questionInTurn].answer) { 
    timerEl.textContent = time -= 10;
    if (time <= 0) {
      time = 0;
    }
  }
  questionInTurn++; 
  if (questionInTurn === questions.length || time < 0) { //WHEN QUESTIONS ARE FINISHED OR TIME IS 0 FINISH QUIZ
    finishQuiz(); 
  } else {
    showQuestion();
  }
}

choicesEl.onclick = clickChoice;

function storageResults() {
  var name = nameEl.value;
  var addResult = {
    name: name,
    score: time,
    };
  if (name !== '') {
    var results = JSON.parse(localStorage.getItem('results')) || []; 
    results.push(addResult);
    localStorage.setItem('results', JSON.stringify(results));
    JSON.parse(localStorage.getItem('results')) || [];
    location.href = 'results.html';
  }
}

submitBtn.onclick = storageResults;
