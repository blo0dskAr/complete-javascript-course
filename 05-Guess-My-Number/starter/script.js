'use strict';

// spielereien
// console.log(document.querySelector('.message'));
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🎉 Correct Number!'
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 20;
// document.querySelector('.guess').value = 23; 
// console.log(document.querySelector('.guess').value);


let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
// document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if (score > 0) {
        if (!guess) {
            document.querySelector('.message').textContent = "😒 No Number!";
        } else if (guess === secretNumber) {
            document.querySelector('.message').textContent = "🎉 Correct Guess!";

            document.querySelector('body').style.backgroundColor = '#60b347';
            document.querySelector('.number').style.width = '30rem'
            document.querySelector('.number').textContent = secretNumber;

            if (score > highscore) {
                document.querySelector('.highscore').textContent = score;
            }

        } else if (guess !== secretNumber) {
            if (score > 1) {
                document.querySelector('.message').textContent =
                    guess > secretNumber ? "🎲 Too high!" : "🎲 Too low!"
                score--;
                document.querySelector('.score').textContent = score;
            } else {
                document.querySelector('.message').textContent = "😥 You lost the game!"
                document.querySelector('.score').textContent = 0;
            }
        }
    };
});

document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.message').textContent = "Start guessing...";
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = "";
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem'

});
