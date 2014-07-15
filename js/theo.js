$(document).ready(function(){
/*
1. check for no selection
	if no selection display 'selection prompt'
2. If selection, check for response and correct two separate components
*/

$.getJSON('js/theo-json.json', function(response) {
 	var content = '';
  	for ( var i in response.quiz){ // for each 
  		
  		var strongText = response.quiz[i].question;
  		content += '<div class="exampleBox"><p class="question">' + strongText + '</p><form>';
		var radioname = 'radio' + i;
		
		//add each answer
		for (var x in response.quiz[i].answers){
			var answerChoice = response.quiz[i].answers[x].choice;
			var answerResponse = response.quiz[i].answers[x].response;
			
			content += '<label class="answer"><input type="radio" name="' + radioname + '" class="question" value="' + answerResponse + '"/> ' + answerChoice + '</label>';
			}
			
		content += '</form><button class="submit">Submit</button></div>';	
		}
	
	$('.exampleHolders').html(content);	
  			
  });
  
  $(document).on('click','.submit',function(e){clickSubmit(e);});
 //variable of correct answers	
var rules = ['correct'];
	
function clickSubmit(e) {
    	alert('click');
        e.preventDefault();
        //check correct answers from var above
        var result;
        switch($('input[name=q4]:checked').attr('class')){
            case 'question': 
                result = '<p class="incorrect">Wrong answer!</p>';
                break;
            default:
                result = '<p class="correct">Correct answer!</p>';
                break;
        }
		
$('.validate').append("<p>" + result + "</p>");
$('.submit').fadeOut(0);
$('.next').show();       
    }


});