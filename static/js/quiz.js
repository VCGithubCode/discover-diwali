// Get the modals
var howToPlay = document.getElementById("instructions");
const music = document.getElementById("music");
const musicToggle = document.getElementById("toggleMusic");
const resetButton = document.querySelector(".btn-reset");


// Play the audio when the user clicks on Music Toggle button
musicToggle.addEventListener("click", function () {    
    if (music.paused) {
        // If the music is paused, start playing
        music.play().catch(error => {
            console.error("Failed to play music:", error);
        });
        // Change the button text to indicate pausing+
        musicToggle.innerHTML = '<i class="fa-solid fa-music"></i> Music On';
        
    } else {
        // If the music is playing, pause it
        music.pause();
        // Change the button text to indicate resuming
        musicToggle.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>Music Off`;
    }
});

// Get the buttons that open the modals
var htp = document.querySelectorAll(".btn")[0];

// When the user clicks the buttons, open the corresponding modal
htp.onclick = function () {
    howToPlay.style.display = "block";
};

// When the user clicks on <span> (x), close the modal

function closeModal(cl) {
    howToPlay.style.display = "none";

}

// When the user clicks anywhere outside of the Guide modal, close modal
window.onclick = function (event) {
    if (event.target == howToPlay) {
        howToPlay.style.display = "none";
    }
};

// The quiz script

// Questions and Answers Array of objects containing 20 questions

const question = [
    {
        ques: "What is Diwali?",
        answers: shuffle([
            { ans: "Festival of lights", result: true },
            { ans: "Victory of Rama", result: false },
            { ans: "Harvest celebration", result: false },
            { ans: "Worship of Kali", result: false }
        ])
    },
    {
        ques: "When is Diwali celebrated?",
        answers: shuffle([
            { ans: "October or November", result: true },
            { ans: "March or April", result: false },
            { ans: "August or September", result: false },
            { ans: "December or January", result: false }
        ])
    },
    {
        ques: "Why is Diwali called the 'Festival of Lights'?",
        answers: shuffle([
            { ans: "Triumph of light", result: true },
            { ans: "Victory of Krishna", result: false },
            { ans: "End of Harvest", result: false },
            { ans: "Worship of Kali", result: false }
        ])
    },
    {
        ques: "What is the significance of diyas in Diwali?",
        answers: shuffle([
            { ans: "Purity and goodness", result: true },
            { ans: "Symbol of knowledge", result: false },
            { ans: "End of harvest", result: false },
            { ans: "Symbol of war", result: false }
        ])
    },
    {
        ques: "How long does Diwali last?",
        answers: shuffle([
            { ans: "Five days", result: true },
            { ans: "One day", result: false },
            { ans: "Three days", result: false },
            { ans: "Ten days", result: false }
        ])
    },
    {
        ques: "Which deity is worshipped on Diwali?",
        answers: shuffle([
            { ans: "Goddess Lakshmi", result: true },
            { ans: "Lord Krishna", result: false },
            { ans: "Lord Ganesha", result: false },
            { ans: "Lord Shiva", result: false }
        ])
    },
    {
        ques: "What is the historical story behind Diwali?",
        answers: shuffle([
            { ans: "Rama's return Ayodhya", result: true },
            { ans: "Krishna's victory", result: false },
            { ans: "Pandavas' return", result: false },
            { ans: "Defeat of Bali", result: false }
        ])
    },
    {
        ques: "How is Diwali celebrated in Uttar Pradesh?",
        answers: shuffle([
            { ans: "Diyas and Lakshmi Puja", result: true },
            { ans: "Firecrackers only", result: false },
            { ans: "Kali Puja", result: false },
            { ans: "Worship of King Bali", result: false }
        ])
    },
    {
        ques: "What is the unique tradition in West Bengal during Diwali?",
        answers: shuffle([
            { ans: "Kali Puja", result: true },
            { ans: "Chopda Puja", result: false },
            { ans: "Ganga Snan", result: false },
            { ans: "Worship of Lakshmi", result: false }
        ])
    },
    {
        ques: "What is Chopda Puja?",
        answers: shuffle([
            { ans: "Business book worship", result: true },
            { ans: "Family puja", result: false },
            { ans: "Worship of Lakshmi", result: false },
            { ans: "Worship of Vamana", result: false }
        ])
    },
    {
        ques: "What is Bhai Dooj?",
        answers: shuffle([
            { ans: "Brother-sister bond", result: true },
            { ans: "Brother-father bond", result: false },
            { ans: "Husband-wife bond", result: false },
            { ans: "Guru-disciple bond", result: false }
        ])
    },
    {
        ques: "What does Naraka Chaturdashi signify?",
        answers: shuffle([
            { ans: "Krishna defeats Narakasura", result: true },
            { ans: "Victory of Rama", result: false },
            { ans: "Worship of King Bali", result: false },
            { ans: "Worship of Ganesha", result: false }
        ])
    },
    {
        ques: "What are rangolis, and why are they made during Diwali?",
        answers: shuffle([
            { ans: "Welcome Lakshmi", result: true },
            { ans: "Scare off demons", result: false },
            { ans: "Decorate homes", result: false },
            { ans: "Worship of Shiva", result: false }
        ])
    },
    {
        ques: "Why are firecrackers burst on Diwali?",
        answers: shuffle([
            { ans: "Ward off evil", result: true },
            { ans: "Welcome guests", result: false },
            { ans: "Celebrate Lakshmi", result: false },
            { ans: "Mark end of harvest", result: false }
        ])
    },
    {
        ques: "What is the significance of cleaning homes before Diwali?",
        answers: shuffle([
            { ans: "Attract Lakshmi", result: true },
            { ans: "Attract Kali", result: false },
            { ans: "Worship of Shiva", result: false },
            { ans: "Symbol of harvest", result: false }
        ])
    },
    {
        ques: "What are some popular Diwali sweets in North India?",
        answers: shuffle([
            { ans: "Kaju Katli", result: true },
            { ans: "Rasgulla", result: false },
            { ans: "Dhokla", result: false },
            { ans: "Chorafali", result: false }
        ])
    },
    {
        ques: "What is special about Diwali in Tamil Nadu?",
        answers: shuffle([
            { ans: "Naraka Chaturdashi focus", result: true },
            { ans: "Kali Puja", result: false },
            { ans: "Lakshmi Puja", result: false },
            { ans: "Harvest celebration", result: false }
        ])
    }
  ];


/**
* Shuffles an array for different answers each time.
* @param {Array} array - The array to be shuffled.
* @returns {Array} The shuffled array.
*/
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}


const questions = document.getElementById("question");
const answerButtons = document.getElementsByClassName("ans");
const nextButton = document.getElementById("next");
let question1 = question;

// Set initial values for quiz counter to nil
let currentQuestionCounter = 0;
let questionNo = 0;
let score = 0;

// Initializing quiz at the end of loading the page

function startQuiz() {
    currentQuestionCounter = 0;
    question1 = question;
    questionNo = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    nextButton.style.display = "none";
}

// Function to pick a random question from the array above and display it

function showQuestion() {
    // Remove previously displayed question and assign it to another array
    question1 = question1.slice(0, currentQuestionCounter).concat(question1.slice(currentQuestionCounter + 1));
    const qL = question1.length - 1;
    while (true) {
        currentQuestionCounter = Math.floor(Math.random() * qL) + 1;
        // Ensuring the counter index does not return an integer less than length of new array
        if (currentQuestionCounter != 0 && currentQuestionCounter != qL) {
            break;
        }
    }
    let questionDisplayed = question1[currentQuestionCounter];
    let questionNumber = questionNo + 1;
    questions.innerHTML = `<i class="fa-solid fa-circle-question"></i> ${questionNumber}. ${questionDisplayed.ques}`; // Display the Question with question number prefix
    questionDisplayed.answers.forEach((answer, i) => {
        document.getElementById("option" + (i + 1)).innerHTML = answer.ans;
    }); // Display corresponding answers to the question displayed
    // Remove any background-color already applied to answer boxes
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].style.display = "block";
        answerButtons[i].classList.remove("green", "red");
    }
    for (let i = 1; i <= answerButtons.length; i++) {
        var buttonId = "option" + [i];
        let x = document.getElementById(buttonId);
        x.style.pointerEvents = "";
        x.style.cursor = "pointer";

    }
}

// Retrieve the answer selected by user and respond 
function enterAnswer(evt) {
    const clicked = evt.target.innerHTML;
    // Find the corresponding question object
    const questionObj = question1[currentQuestionCounter];
    const ansArray = questionObj.answers;
    // Find the corresponding answer object
    const answerObj = questionObj.answers.find((a) => a.ans === clicked);
    // Add classes based on the result
    if (answerObj.result === true) {
        evt.target.classList.add("green");
        score++; // Increment the score if the answer is correct
    } else {
        evt.target.classList.add("red");
    }
    // Find correct Answer object
    let rightAns;
    ansArray.forEach(function (obj, c) {
        if (obj.result === true) {
            rightAns = ansArray[c].ans;
        }
    });
    // Disable answer buttons after selection
    for (let i = 1; i <= answerButtons.length; i++) {
        var buttonId = "option" + [i];
        let x = document.getElementById(buttonId);
        x.style.pointerEvents = "none";
        x.style.button = "disable";
        x.style.cursor = "none";
        // Add green color background to the right answer
        if (x.textContent === rightAns) {
            x.classList.add("green");
        }
    }
    // Show next button
    nextButton.style.display = "block";
}

startQuiz();

// Proceed to next question when user clicks next button
function nextQuestion() {
    // Move to the next question
    questionNo++;
    // If all questions are answered, display score
    if (questionNo >= 10) {
        submitScore(score);
        questions.innerHTML = `Your score is: ${score} / 10`;
        nextButton.style.display = "none"; // Hide next button
        document.getElementsByClassName("question-box").classList.add("score");
        for (let i = 0; i < answerButtons.length; i++) {
            answerButtons[i].style.display = "none";
        }
    } else {
        showQuestion();
        nextButton.style.display = "none"; // Hide next button
    }
}

// Function to submit the score to MongoDB
function submitScore(finalScore) {
    questions.innerHTML = 'Submitting your score...';
    fetch('/quiz_complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `score=${finalScore}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/leaderboard';
        } else {
            questions.innerHTML = 'Failed to submit score. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error submitting score:', error);
        questions.innerHTML = 'An error occurred. Please try again.';
    });
}

// Function to reset the game
function resetGame() {
    // Reset current question counter and score
    currentQuestionCounter = 0;
    question1 = question;
    questionNo = 0;
    score = 0;
    // Show the first question
    showQuestion();
    // Remove any previous styling and enable answer buttons
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].style.display = "block";
        answerButtons[i].classList.remove("green", "red");
        answerButtons[i].disabled = false;
    }
    // Hide the next button
    nextButton.style.display = "none";
}

function openModal() {
    document.getElementById("instructions").style.display = "block";
}

// Event listener for the reset button and Next button
resetButton.addEventListener("click", resetGame);
nextButton.addEventListener("click", nextQuestion);