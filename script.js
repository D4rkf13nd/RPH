const quizData = [
    {
        question: "The measures taken to prevent fire or minimize the loss of life or property resulting from a fire, including limiting fire loads and hazards, confining the spread of fire, and training building occupants in evacuation procedures.",
        options: ["Fire Hazard","Fire Safety","Fireproofing","Flame Retardant"],
        correct: 1
    },
    {
        question: "Any condition that increases the likelihood of a fire, obstructs access to firefighting equipment, or delays the egress of occupants in the event of fire.",
        options: ["Fire Load","Fire Hazard","Fire Separation","Smoke-Developed Rating"],
        correct: 1
    },
    {
        question: "The amount of combustible material in a building, measured in pounds per square foot of floor area.",
        options: ["Fire Load","Flame-Spread Rating","Fireproofing","Occupancy Separation"],
        correct: 0
    },
    {
        question: "Of or pertaining to a material capable of igniting and burning.",
        options: ["Combustible","Fire Safety","Intumescent Paint","Fuel-Contribution Rating"],
        correct: 0
    },
    {
        question: "Noting or pertaining to a material, assembly, or construction having a fire-resistance rating required by its use. Also, fire-resistive.",
        options: ["Fire-Rated","Flame Retardant","Fire Wall","Smoke-Developed Rating"],
        correct: 0
    },
    {
        question: "The time in hours a material or assembly can be expected to withstand exposure to fire without collapsing or developing openings that permit passage of flame or hot gases.",
        options: ["Fireproofing","Fire-Resistance Rating","Flash Point","Tunnel Test"],
        correct: 1
    },
    {
        question: "The lowest temperature at which a substance will undergo spontaneous combustion and continue to burn without additional application of external heat.",
        options: ["Ignition Point","Flash Point","Fire Load","Flame Retardant"],
        correct: 0
    },
    {
        question: "The lowest temperature at which a combustible liquid will give off sufficient vapor to ignite momentarily when exposed to flame.",
        options: ["Fire Wall","Flash Point","Combustible","Intumescent Paint"],
        correct: 1
    },
    {
        question: "A test measuring the time it takes for a controlled flame to spread across the face of a test specimen, the amount of fuel the material contributes to the fire, and the density of smoke developed by the fire.",
        options: ["Tunnel Test","Fireproofing","Fire Safety","Distance Separation"],
        correct: 0
    },
    {
        question: "A rating of how quickly a fire can spread along the surface of an interior finish material.",
        options: ["Flame-Spread Rating","Flash Point","Smoke-Developed Rating","Fire-Resistance Rating"],
        correct: 0
    },
    {
        question: "A rating of the amount of combustible substances an interior finish material can contribute to a fire.",
        options: ["Fuel-Contribution Rating","Fireproofing","Combustible","Fire Load"],
        correct: 0
    },
    {
        question: "A rating of the amount of smoke an interior finish material can produce when it burns. Materials having this rating above 450 are not permitted inside buildings.",
        options: ["Smoke-Developed Rating","Tunnel Test","Flame-Spread Rating","Fire Area"],
        correct: 0
    },
    {
        question: "A compound used to raise the ignition point of a flammable material, thus making it more resistant to fire.",
        options: ["Flame Retardant","Fireproofing","Fire-Rated","Combustible"],
        correct: 0
    },
    {
        question: "Any of various materials, such as concrete, lath and plaster, or gypsum board, used in making a building material, member, or system resistant to damage or destruction by fire.",
        options: ["Fireproofing","Fire Load","Fire Wall","Fire Separation"],
        correct: 0
    },
    {
        question: "A mixture of mineral fibers and an inorganic binder, applied by air pressure with a spray gun to provide a thermal barrier to the heat of a fire.",
        options: ["Spray-On Fireproofing","Intumescent Paint","Flame Retardant","Fire-Resistance Rating"],
        correct: 0
    },
    {
        question: "A coating that, when exposed to the heat of a fire, swells to form a thick insulating layer of inert gas bubbles that retards flame spread and combustion.",
        options: ["Intumescent Paint","Fire Wall","Fire Safety","Flash Point"],
        correct: 0
    },
    {
        question: "A hollow structural-steel column filled with water to increase its fire resistance. If exposed to flame, the water absorbs heat and circulates to remove it.",
        options: ["Liquid-Filled Column","Fire Wall","Fire Area","Combustible"],
        correct: 0
    },
    {
        question: "Any floor, wall, or roof-ceiling construction having the required fire-resistance rating to confine the spread of fire.",
        options: ["Fire Separation","Occupancy Separation","Distance Separation","Fire Hazard"],
        correct: 0
    },
    {
        question: "A vertical or horizontal construction having the required fire-resistance rating to prevent the spread of fire from one occupancy to another in a mixed-occupancy building.",
        options: ["Occupancy Separation","Fireproofing","Fire Load","Flame Retardant"],
        correct: 0
    },
    {
        question: "The separation required between an exterior wall of a building and a property line, public space, or adjacent building, measured at right angles to the exterior wall.",
        options: ["Distance Separation","Fire Wall","Fireproofing","Fire Safety"],
        correct: 0
    },
    {
        question: "An area of a building enclosed by fire-rated construction capable of confining the spread of fire.",
        options: ["Fire Area","Flame Retardant","Smoke-Developed Rating","Fire Load"],
        correct: 0
    },
    {
        question: "A wall having the required fire-resistance rating to prevent the spread of fire from one part of a building to another, extending from the foundation to a parapet above the roof.",
        options: ["Fire Wall","Fire Hazard","Fire Safety","Fireproofing"],
        correct: 0
    }
];


let quizOrder = [];
let currentAnswers = [];
let currentQuestion = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createQuiz() {
    // If quizOrder is not set, initialize and shuffle
    if (!quizOrder.length) {
        quizOrder = Array.from({length: quizData.length}, (_, i) => i);
        shuffleArray(quizOrder);
    }
    if (!currentAnswers.length || currentAnswers.length !== quizData.length) {
        currentAnswers = new Array(quizData.length).fill(-1);
    }
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    quizOrder.forEach((qIdx, index) => {
        const question = quizData[qIdx];
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        if (index === 0) questionDiv.classList.add('active');

        questionDiv.innerHTML = `
            <div class="question">${index + 1}. ${question.question}</div>
            <div class="options">
                ${question.options.map((option, optionIndex) => `
                    <div class="option" data-q="${index}" data-o="${optionIndex}" onclick="selectOption(${index}, ${optionIndex})">
                        ${String.fromCharCode(97 + optionIndex)}) ${option}
                    </div>
                `).join('')}
            </div>
            <div class="feedback" id="feedback-${index}" aria-live="polite"></div>
        `;
        quizContainer.appendChild(questionDiv);
    });
    // Restore any previous answers (when resetting or revisiting)
    quizOrder.forEach((qIdx, index) => {
        if (currentAnswers[index] !== -1) {
            const qDiv = document.querySelectorAll('.question-container')[index];
            const options = qDiv.querySelectorAll('.option');
            const ans = currentAnswers[index];
            options.forEach(opt => opt.style.pointerEvents = 'none');
            options[ans].classList.add('selected');
            const correctIndex = quizData[qIdx].correct;
            const feedbackEl = document.getElementById(`feedback-${index}`);
            if (ans === correctIndex) {
                options[ans].classList.add('correct');
                feedbackEl.textContent = 'Correct!';
                feedbackEl.style.color = '#2e7d32';
            } else {
                options[ans].classList.add('wrong');
                options[correctIndex].classList.add('correct');
                feedbackEl.textContent = `Incorrect. Correct answer: ${options[correctIndex].textContent}`;
                feedbackEl.style.color = '#c62828';
            }
        }
    });
    updateNavigation();
    // Hide score page if visible
    const scorePage = document.getElementById('scorePage');
    if (scorePage) scorePage.style.display = 'none';
}

function selectOption(questionIndex, optionIndex) {
    // If already answered, ignore further clicks
    if (currentAnswers[questionIndex] !== -1) return;

    const questionContainer = document.querySelectorAll('.question-container')[questionIndex];
    const options = questionContainer.querySelectorAll('.option');

    // Mark selected
    options[optionIndex].classList.add('selected');
    currentAnswers[questionIndex] = optionIndex;

    // Disable all options for this question
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    // Show immediate feedback and highlight correct/wrong
    const qIdx = quizOrder[questionIndex];
    const correctIndex = quizData[qIdx].correct;
    const feedbackEl = document.getElementById(`feedback-${questionIndex}`);
    if (optionIndex === correctIndex) {
        options[optionIndex].classList.add('correct');
        feedbackEl.textContent = 'Correct!';
        feedbackEl.style.color = '#2e7d32';
    } else {
        options[optionIndex].classList.add('wrong');
        options[correctIndex].classList.add('correct');
        const correctText = questionContainer.querySelectorAll('.option')[correctIndex].textContent;
        feedbackEl.textContent = `Incorrect. Correct answer: ${correctText}`;
        feedbackEl.style.color = '#c62828';
    }

    // Enable navigation (Next/Submit) since this question is answered
    updateNavigation();
}

function checkAnswers() {
    let score = 0;
    const questions = document.querySelectorAll('.question-container');

    questions.forEach((question, index) => {
        const options = question.querySelectorAll('.option');
        const selectedOption = currentAnswers[index];
        const qIdx = quizOrder[index];
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        if (selectedOption === quizData[qIdx].correct) {
            score++;
            if (selectedOption !== -1) options[selectedOption].classList.add('correct');
        } else if (selectedOption !== -1) {
            options[selectedOption].classList.add('wrong');
            options[quizData[qIdx].correct].classList.add('correct');
        }
    });

    // Hide all questions
    questions.forEach(q => q.style.display = 'none');

    // Show score page
    let scorePage = document.getElementById('scorePage');
    if (!scorePage) {
        scorePage = document.createElement('div');
        scorePage.id = 'scorePage';
        scorePage.style.display = 'flex';
        scorePage.style.flexDirection = 'column';
        scorePage.style.alignItems = 'center';
        scorePage.style.justifyContent = 'center';
        scorePage.style.background = 'var(--card)';
        scorePage.style.borderRadius = '10px';
        scorePage.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
        scorePage.style.padding = '32px 18px 24px 18px';
        scorePage.style.margin = '0 auto 12px auto';
        scorePage.style.maxWidth = '420px';
        scorePage.style.minWidth = '0';
        scorePage.style.width = '100%';
        scorePage.style.minHeight = '180px';
        scorePage.style.fontSize = '1.1rem';
        scorePage.style.textAlign = 'center';
        scorePage.style.gap = '12px';
        scorePage.style.transition = 'all .2s';
        scorePage.className = 'score-page';
        document.getElementById('quiz').appendChild(scorePage);
    }
    scorePage.style.display = 'flex';

    const percentage = (score / quizData.length) * 100;
    scorePage.style.backgroundColor = percentage >= 70 ? '#c8e6c9' : '#ffcdd2';
    let extraMsg = '';
    if (percentage === 100) {
        extraMsg = 'iloveyoumoree baby koo galing galing talaga';
    } else if (percentage > 80) {
        extraMsg = 'kunti nalang ma perfect mo po yan baby ko';
    } else if (percentage >= 75) {
        extraMsg = 'galing naman ng baby kooo';
    } else if (percentage >= 50) {
        extraMsg = 'kaya mo yan baby';
    }
    scorePage.innerHTML = `<div style="font-weight:700;font-size:1.2rem;margin-bottom:8px;">Your score: ${score}/${quizData.length} (${percentage.toFixed(2)}%)</div>`
        + (extraMsg ? `<div class="encouragement">${extraMsg}</div>` : '')
        + `<button class="retry-btn" onclick="resetQuiz()" style="margin-top:18px;display:inline-block;">Try Again</button>`;

    // Hide navigation
    document.querySelector('.submit-btn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('prevBtn').style.display = 'none';
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        const questions = document.querySelectorAll('.question-container');
        questions[currentQuestion].classList.remove('active');
        currentQuestion++;
        questions[currentQuestion].classList.add('active');
        updateNavigation();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        const questions = document.querySelectorAll('.question-container');
        questions[currentQuestion].classList.remove('active');
        currentQuestion--;
        questions[currentQuestion].classList.add('active');
        updateNavigation();
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.querySelector('.submit-btn');
    const counter = document.getElementById('questionCounter');
    const progress = document.getElementById('progress');

    prevBtn.disabled = currentQuestion === 0;

    // Require answering current question before allowing Next/Submit
    const answered = currentAnswers[currentQuestion] !== -1;

    if (currentQuestion === quizData.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        submitBtn.disabled = !answered;
    } else {
        nextBtn.style.display = 'block';
        nextBtn.disabled = !answered;
        submitBtn.style.display = 'none';
        submitBtn.disabled = true;
    }

    counter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    progress.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    // Show navigation if hidden (after retry)
    prevBtn.style.display = 'block';
    nextBtn.style.display = (currentQuestion === quizData.length - 1) ? 'none' : 'block';
}

function resetQuiz() {
    // Shuffle question order for new try
    quizOrder = Array.from({length: quizData.length}, (_, i) => i);
    shuffleArray(quizOrder);
    currentAnswers = new Array(quizData.length).fill(-1);
    currentQuestion = 0;
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';
    createQuiz();

    // Hide score page if present
    const scorePage = document.getElementById('scorePage');
    if (scorePage) scorePage.style.display = 'none';

    document.querySelector('.submit-btn').style.display = 'none';
    // Hide all retry buttons except the one on score page
    document.querySelectorAll('.retry-btn').forEach(btn => btn.style.display = 'none');
    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('prevBtn').style.display = 'block';
    updateNavigation();
}

// Initialize the quiz when the page loads
window.onload = function() {
    quizOrder = Array.from({length: quizData.length}, (_, i) => i);
    shuffleArray(quizOrder);
    currentAnswers = new Array(quizData.length).fill(-1);
    createQuiz();
};
