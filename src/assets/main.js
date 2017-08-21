let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if(answer.value == '' || attempt.value == '') {
    	setHiddenFields();
    }
    if(!validateInput(input.value)) {
    	return false;
    } else {
    	attempt.value++;
    }
   
   	if(getResults(input.value)) {
    	setMessage("You Win! :)");
    	showAnswer(true);
    	showReplay();
    } else  if(attempt.value >= 10) {
    	setMessage("You Lose! :(");
    	showAnswer(false);
    	showReplay();
    
    } else {
    	setMessage("Incorrect, try again.");
    }
}

function setHiddenFields() {
	answer.value = Math.floor(Math.random() * 10000).toString();
	while(answer.value.length < 4) {
		answer.value = 0 + answer.value;
	}
	attempt.value = 0;
}

function setMessage(text) {
	let message = document.getElementById('message');
	message.innerHTML = text;
}

function validateInput(input) {
	if(input.length == 4) {
		return true;
	} else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults(input) {
	let results = document.getElementById('results');
	let correct = 0;
	let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
	
	for(i = 0; i < input.length; i++) {
        if(input.charAt(i) == answer.value.charAt(i)) {
            html += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        } else if (answer.value.indexOf(input.charAt(i)) > -1) {
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
	
	results.innerHTML += html;

	if (correct == input.length) {
		return true;
	} else {
		return false;
	}
}

function showAnswer(wonGame) {
	let code = document.getElementById('code');

	code.innerHTML = answer.value;
	if(wonGame) {
		code.className += " success";
	} else {
		code.className += " failure";
	}
}

function showReplay() {
	document.getElementById('guessing-div').style = "display:none";
	document.getElementById('replay-div').style = "display:block";
}