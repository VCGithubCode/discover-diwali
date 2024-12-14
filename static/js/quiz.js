/* Specifying the version of ECMAScript */
/* eslint-env es6 */
/* eslint arrow-body-style: "error" */

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
          { ans: "A Hindu festival of lights", result: true },
          { ans: "A festival celebrated in Antarctica", result: false },
          { ans: "A New Year celebration in China", result: false },
          { ans: "A Buddhist festival in Japan", result: false }
      ])
  },
  {
      ques: "When is Diwali celebrated?",
      answers: shuffle([
          { ans: "During the Hindu month of Kartika", result: true },
          { ans: "During Christmas Eve", result: false },
          { ans: "In July", result: false },
          { ans: "On New Year's Day", result: false }
      ])
  },
  {
      ques: "Why is Diwali called the 'Festival of Lights'?",
      answers: shuffle([
          { ans: "Because people light diyas and burst firecrackers", result: true },
          { ans: "Because it rains diamonds", result: false },
          { ans: "Because it marks the beginning of spring", result: false },
          { ans: "Because it symbolizes the changing of seasons", result: false }
      ])
  },
  {
      ques: "What is the significance of diyas in Diwali?",
      answers: shuffle([
          { ans: "They symbolize purity, goodness, and enlightenment", result: true },
          { ans: "They represent the stars in the sky", result: false },
          { ans: "They are a signal for fishermen", result: false },
          { ans: "They symbolize wealth and prosperity", result: false }
      ])
  },
  {
      ques: "How long does Diwali last?",
      answers: shuffle([
          { ans: "Five days", result: true },
          { ans: "One day", result: false },
          { ans: "Seven days", result: false },
          { ans: "A month", result: false }
      ])
  },
  {
      ques: "Which deity is worshipped on Diwali?",
      answers: shuffle([
          { ans: "Goddess Lakshmi", result: true },
          { ans: "Lord Shiva", result: false },
          { ans: "Lord Hanuman", result: false },
          { ans: "Lord Ganesha", result: false }
      ])
  },
  {
      ques: "What are the five days of Diwali?",
      answers: shuffle([
          { ans: "Dhanteras, Naraka Chaturdashi, Lakshmi Puja, Govardhan Puja, Bhai Dooj", result: true },
          { ans: "New Year's Eve, New Year, Pongal, Holi, Easter", result: false },
          { ans: "Navratri, Pongal, Dussehra, Christmas, Holi", result: false },
          { ans: "Monday, Tuesday, Wednesday, Thursday, Friday", result: false }
      ])
  },
  {
      ques: "What is the historical story behind Diwali?",
      answers: shuffle([
          { ans: "Lord Rama's return to Ayodhya after defeating Ravana", result: true },
          { ans: "The discovery of America", result: false },
          { ans: "The invention of the light bulb", result: false },
          { ans: "The creation of the first rocket", result: false }
      ])
  },
  {
      ques: "Why is Diwali called 'Bandi Chhor Divas' in Punjab?",
      answers: shuffle([
          { ans: "It marks the release of Guru Hargobind Sahib from Mughal imprisonment", result: true },
          { ans: "It celebrates the defeat of the British in Punjab", result: false },
          { ans: "It is a harvest festival", result: false },
          { ans: "It marks the founding of the Sikh religion", result: false }
      ])
  },
  {
      ques: "What is the significance of Dhanteras?",
      answers: shuffle([
          { ans: "It is a day to buy gold, silver, or utensils for prosperity", result: true },
          { ans: "It is the day of Raksha Bandhan", result: false },
          { ans: "It is a day to visit temples", result: false },
          { ans: "It is a festival celebrated with colors", result: false }
      ])
  },
  {
      ques: "What does Naraka Chaturdashi signify?",
      answers: shuffle([
          { ans: "Lord Krishna's victory over the demon Narakasura", result: true },
          { ans: "The start of the monsoon season", result: false },
          { ans: "The beginning of spring", result: false },
          { ans: "The discovery of electricity", result: false }
      ])
  },
  {
      ques: "What is Bhai Dooj?",
      answers: shuffle([
          { ans: "A day celebrating the bond between brothers and sisters", result: true },
          { ans: "The day of the first snowfall", result: false },
          { ans: "A celebration of friendship", result: false },
          { ans: "A festival marking the first day of the year", result: false }
      ])
  },
  {
      ques: "Why is Lakshmi Puja important during Diwali?",
      answers: shuffle([
          { ans: "Lakshmi blesses homes with wealth and prosperity", result: true },
          { ans: "It celebrates the birth of Lord Krishna", result: false },
          { ans: "It marks the beginning of harvest season", result: false },
          { ans: "It is celebrated as New Year in some states", result: false }
      ])
  },
  {
      ques: "What are rangolis, and why are they made during Diwali?",
      answers: shuffle([
          { ans: "Colorful designs made to welcome Goddess Lakshmi", result: true },
          { ans: "Decorations made for school festivals", result: false },
          { ans: "Artworks displayed in museums", result: false },
          { ans: "Doodles drawn by children", result: false }
      ])
  },
  {
      ques: "Why are firecrackers burst on Diwali?",
      answers: shuffle([
          { ans: "To symbolize the triumph of light over darkness", result: true },
          { ans: "To create noise pollution", result: false },
          { ans: "To generate electricity", result: false },
          { ans: "To scare away birds", result: false }
      ])
  },
  {
      ques: "Which state celebrates the brightest Diwali?",
      answers: shuffle([
          { ans: "Uttar Pradesh, especially Ayodhya", result: true },
          { ans: "Himachal Pradesh", result: false },
          { ans: "Sikkim", result: false },
          { ans: "Goa", result: false }
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

// Event listener for the reset button and Next button
resetButton.addEventListener("click", resetGame);
nextButton.addEventListener("click", nextQuestion);