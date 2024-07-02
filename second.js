let quiz = []; // Array to store quiz questions

function submitQuiz() {
    event.preventDefault();

    const question = document.getElementById('question').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const option4 = document.getElementById('option4').value;
    const correctAnswer = parseInt(document.getElementById('correct-answer').value);

    if (correctAnswer < 1 || correctAnswer > 4) {
        alert("Please enter a correct answer option between 1 to 4.");
        return;
    }

    // Create question object
    const newQuestion = {
        question: question,
        options: [option1, option2, option3, option4],
        correctAnswer: correctAnswer
    };

    // Add question to quiz array
    quiz.push(newQuestion);

    // Clear form fields
    document.getElementById('question').value = '';
    document.getElementById('option1').value = '';
    document.getElementById('option2').value = '';
    document.getElementById('option3').value = '';
    document.getElementById('option4').value = '';
    document.getElementById('correct-answer').value = '';

    console.log("Question added to quiz:");
    console.log(newQuestion);
}

function loadQuizForTaking() {
    // Clear previous quiz questions
    document.getElementById('quiz-questions').innerHTML = '';

    // Display the most recently created quiz
    quiz.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        // Display question
        const questionLabel = document.createElement('label');
        questionLabel.textContent = `${index + 1}. ${question.question}`;
        questionDiv.appendChild(questionLabel);

        // Display options
        question.options.forEach((option, optionIndex) => {
            const optionLabel = document.createElement('label');
            const radioButton = document.createElement('input');
            radioButton.type = 'radio';
            radioButton.name = `question${index}`;
            radioButton.value = optionIndex + 1;
            optionLabel.appendChild(radioButton);
            optionLabel.appendChild(document.createTextNode(option));
            questionDiv.appendChild(optionLabel);
        });

        document.getElementById('quiz-questions').appendChild(questionDiv);
    });

    // Display the quiz-taking section
    document.getElementById('quiz-taking').style.display = 'block';
}

function gradeQuiz() {
    const questions = document.querySelectorAll('.question');
    let score = 0;

    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input:checked');

        if (selectedOption) {
            const selectedAnswer = parseInt(selectedOption.value);
            if (selectedAnswer === quiz[index].correctAnswer) {
                score++;
            }
        }
    });

    const totalQuestions = quiz.length;

    // Display results
    const resultsDiv = document.getElementById('quiz-results');
    resultsDiv.style.display = 'block';
    resultsDiv.textContent = `You scored ${score} out of ${totalQuestions}`;

    // Clear quiz array for next quiz
    quiz = [];
}
