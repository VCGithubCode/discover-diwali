// Quiz logic for the quiz page
// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  /**
   * Array of questions and answers for the quiz.
   * Each question contains the question text and multiple answer options.
   */
  const questions = [
    {
      ques: "Which state celebrates Diwali as 'Bandi Chhor Divas'?",
      answers: [
        { ans: "Punjab", result: true },
        { ans: "Rajasthan", result: false },
        { ans: "Tamil Nadu", result: false },
        { ans: "Maharashtra", result: false }
      ]
    },
    {
      ques: "Which traditional sweet is commonly prepared during Diwali?",
      answers: [
        { ans: "Ladoo", result: true },
        { ans: "Pizza", result: false },
        { ans: "Burger", result: false },
        { ans: "Pasta", result: false }
      ]
    }
  ];

  const questionBox = document.getElementById('question');
  const answerButtons = document.getElementsByClassName('ans');
  const nextButton = document.getElementById('next');

  let currentQuestionIndex = 0;

  /**
   * Displays the current question and answer options.
   * Updates the question text and sets the event listeners for answer buttons.
   */
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionBox.innerHTML = currentQuestion.ques;

    currentQuestion.answers.forEach((answer, i) => {
      const answerButton = document.getElementById('option' + (i + 1));
      answerButton.innerHTML = answer.ans;
      answerButton.onclick = () => handleAnswerClick(answer.result, answerButton);
    });
  }

  /**
   * Handles the logic when a user clicks on an answer.
   * Highlights the answer as correct (green) or incorrect (red) and shows the next button.
   * 
   * @param {boolean} isCorrect - Whether the selected answer is correct.
   * @param {HTMLElement} button - The button element that was clicked.
   */
  function handleAnswerClick(isCorrect, button) {
    if (isCorrect) {
      button.classList.add('green');
    } else {
      button.classList.add('red');
    }
    nextButton.style.display = 'block';
  }

  /**
   * Advances to the next question in the quiz.
   * If there are no more questions, it displays a completion message.
   */
  nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
      questionBox.innerHTML = `Quiz Complete!`;
      nextButton.style.display = 'none';
    } else {
      showQuestion();
    }
  };

  // Show the first question when the page loads
  showQuestion();
});