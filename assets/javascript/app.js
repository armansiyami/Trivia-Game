
$(document).ready(function () {

	$("#timeRemain").hide();
	$("#start").on('click', trivia.startGame);
	$(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {
	
	questions: {
		q1: 'Which of the following is NOT a ghost from the original Pac-Man?',
		q2: 'Which of the following "Scrabble" tiles has the highest value?',
		q3: 'Which of these is the winning hand in a game of poker?',
		q4: 'Which of the following is a genuine Pokémon type?',
		q5: "Under what name did Mario debut in 1981's 'Donkey Kong'?",
		q6: 'Which is NOT a dungeon in The Legend of Zelda: Ocarina of Time?',
		q7: "Which of the following consoles was released by 'Sega'?"
	},
	options: {
		q1: ['Inky', 'Winky', 'Clyde', 'Inky'],
		q2: ['J', 'X', 'Q', 'K'],
		q3: ['5♣ 7♠ 10♦ 10♥ A♦', '7♠ 7♥ Q♣ Q♦ Q♥', '4♠ 8♠ 9♠ K♠ A♠', '2♣ 2♥ 3♥ 4♥ J♠'],
		q4: ['Light', 'Earth', 'Air', 'Dark'],
		q5: ['Mario', 'Luigi', 'Jumpman', 'Plumberman'],
		q6: ['Fire Temple', 'Spirit Temple', 'Shadow Temple', 'Light Temple'],
		q7: ['Dreamcast', 'Jaguar', 'Gamecube', 'Zodiac']
	},
	answers: {
		q1: 'Winky',
		q2: 'Q',
		q3: '7♠ 7♥ Q♣ Q♦ Q♥',
		q4: 'Dark',
		q5: 'Jumpman',
		q6: 'Light Temple',
		q7: 'Dreamcast'
	},
	
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	currentSet: 0,
	timer: 20,
	timerOn: false,
	timerId: '',

	startGame: function () {
		trivia.currentSet = 0;
		trivia.correct = 0;
		trivia.incorrect = 0;
		trivia.unanswered = 0;
		clearInterval(trivia.timerId);

		$('#game').show();
		$('#results').html('');
		$('#timer').text(trivia.timer);
		$('#start').hide();
		$('#timeRemain').show();
		trivia.nextQuestion();

	},

	nextQuestion: function () {
		trivia.timer = 10;
		$('#timer').removeClass('last-seconds');
		$('#timer').text(trivia.timer);

		if (!trivia.timerOn) {
			trivia.timerId = setInterval(trivia.timerRunning, 1000);
		}

		var questionContent = Object.values(trivia.questions)[trivia.currentSet];
		$('#question').text(questionContent);

		var questionOptions = Object.values(trivia.options)[trivia.currentSet];

		$.each(questionOptions, function (index, key) {
			$('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
		})

	},
	timerRunning: function () {
		if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
			$('#timer').text(trivia.timer);
			trivia.timer--;
			if (trivia.timer === 4) {
				$('#timer').addClass('last-seconds');
			}
		} else if (trivia.timer === -1) {
			trivia.unanswered++;
			trivia.result = false;
			clearInterval(trivia.timerId);
			resultId = setTimeout(trivia.guessResult, 1000);
			$('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
		} else if (trivia.currentSet === Object.keys(trivia.questions).length) {

			$('#results')
				.html('<h3>Thank you for playing!</h3>' +
					'<p>Correct: ' + trivia.correct + '</p>' +
					'<p>Incorrect: ' + trivia.incorrect + '</p>' +
					'<p>Unaswered: ' + trivia.unanswered + '</p>' +
					'<p>Please play again!</p>');


			$('#game').hide();
			$('#start').show();
		}

	},

	guessChecker: function () {


		var resultId;

		var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

		if ($(this).text() === currentAnswer) {

			$(this).addClass('btn-success').removeClass('btn-info');

			trivia.correct++;
			clearInterval(trivia.timerId);
			resultId = setTimeout(trivia.guessResult, 1000);
			$('#results').html('<h3>Correct Answer!</h3>');
		} else {
			$(this).addClass('btn-danger').removeClass('btn-info');

			trivia.incorrect++;
			clearInterval(trivia.timerId);
			resultId = setTimeout(trivia.guessResult, 1000);
			$('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
		}

	},
	guessResult: function () {
		trivia.currentSet++;


		$('.option').remove();
		$('#results h3').remove();


		trivia.nextQuestion();

	}

}
