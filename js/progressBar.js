$(document).ready(function(){

//initialize some data
var quizData;
var current = 0;
var totalCount = 0;
var correct = 0;
var incorrect = 0;


function initializeQuiz(){

	$.getJSON('js/theo-json.json', function(data) {
 		totalCount = data.quiz.length;
 		
 		generateProgressBar(totalCount);
 		
 		quizData = data;
	
 		generateQuestion(0);
   });
}	


function generateQuestion(num){
 	var content = '';
  	var questionText = quizData.quiz[num].question;
  		content += '<div class="exampleBox"><p class="question">' + questionText + '</p><form>';
		
		var radioname = 'radio' + num;
		
		//add each answer from json data
		for (var x in quizData.quiz[num].answers){
			var answerChoice = quizData.quiz[num].answers[x].choice;
			var answerResponse = quizData.quiz[num].answers[x].response;
			
			content += '<label class="answer"><input type="radio" name="' + radioname + '" class="question inputRadio" value="' + x + '"/> ' + answerChoice + '</label>';
			}
			
		content += '</form><div class="responseMsg"></div><button class="submit">Submit</button><div class="noChoice error" style="display:none;">Please make a selection</div><button class="next">NEXT</button></div>';	
	
	$('.exampleHolders').html(content);	
	
}

initializeQuiz();
  
  	
function clickSubmit(e) {
	e.preventDefault();
	
	//check to see if radio button is checked
	if($('input[name=radio'+ current + ']').is(":checked")){
		$('.submit').fadeOut(0);
		
		//show the response for the question and increment how many right or wrong
		var chosen = $('input[name=radio'+ current + ']:checked').val();
	    var isCorrect = quizData.quiz[current].answers[chosen].correct;
		 
		//check to see if correct 
		if(isCorrect){
			$('.responseMsg').addClass('green');
			correct += 1;
		} else {
			$('.responseMsg').addClass('red');
			incorrect += 1;
		}
		
		$('.responseMsg').html(quizData.quiz[current].answers[chosen].response);
		
		$('.next').show();
		
	}else{
		//show make a choice   
		$('.noChoice').show();
	}  
}


function generateResults(){
	var content = '';
	
	content += '<div class="exampleBox"><p class="question">YOUR RESULTS</p><div class="results"><h3>Correct: <span class="green">' + correct + '</span> &nbsp;&nbsp;&nbsp;   Wrong: <span class="red">' + incorrect + '</span></h3></div>';
	
	//reset button
	content += '<button class="reset">TRY AGAIN?</button></div>'
	$('.exampleHolders').html(content);	
}


function clickNext(e){
	e.preventDefault();
	
	if( current < totalCount - 1){
			//more questions to come load the next one
			current += 1;
			generateQuestion(current);
		} else{
			//show total wrong and right
			current += 1;
			generateResults();
		}
	updateProgress();	
}

function clickReset(e){
	e.preventDefault();
	current = 0;
	correct = 0;
	incorrect = 0;
	
	generateQuestion(0);
	
	//reset progress bar
	$('.progressBar li').removeClass('done');
	updateProgress();
}

function generateProgressBar(num){
	var progress = '';
	
	for( var j = 0; j < num; j++){
		var count = j + 1;
		progress += '<li class="progressItem"><span>&nbsp;</span></li>';
	}
	
	$('.progressBar').html(progress);
	updateProgress();
}

function updateProgress(){
	$('.progressBar li').removeClass('active');
	$('.progressBar li:eq(' + current + ')').addClass('active');
	//$('.progressBar li').addClass('done');
	
	for( var k = 0; k < current; k++){
		$('.progressBar li:eq(' + k + ')').addClass('done');
	}
}

$(document).on('click','.submit',function(e){clickSubmit(e);});
$(document).on('click','.next', function(e){clickNext(e);});
$(document).on('click','.reset', function(e){clickReset(e);});
$(document).on('click', '.inputRadio', function(){ $('.noChoice').hide();}); 




});