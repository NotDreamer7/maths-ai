// Initialize MathQuill for Math Input
var MQ = MathQuill.getInterface(2);
var mathFieldSpan = document.getElementById('math-field');
var mathField = MQ.MathField(mathFieldSpan, {
    spaceBehavesLikeTab: true
});

// Solve Function
function solveMath() {
    let inputMath = mathField.latex();
    let topic = document.getElementById("topic").value;
    let solutionDiv = document.getElementById("solution");
    
    try {
        let parsedMath = inputMath.replace(/\\frac{([^}]*)}{([^}]*)}/g, "($1)/($2)")
                                  .replace(/\\cdot/g, "*")
                                  .replace(/\\left|\\right/g, "")
                                  .replace(/\\dfrac/g, "");

        let result;
        if (topic === "differentiate") {
            result = nerdamer.diff(parsedMath, 'x').toString();
        } else if (topic === "integrate") {
            result = nerdamer.integrate(parsedMath, 'x').toString();
        }

        solutionDiv.innerHTML = `Solution: \\(${result}\\)`;
        MathJax.typeset();
    } catch (error) {
        solutionDiv.innerHTML = "Invalid input!";
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

// Load Dark Mode Preference
window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    generateQuiz();
};

// Graphing Calculator
var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);

function updateGraph() {
    let inputMath = mathField.latex();
    let parsedMath = inputMath.replace(/\\frac{([^}]*)}{([^}]*)}/g, "($1)/($2)")
                              .replace(/\\cdot/g, "*")
                              .replace(/\\left|\\right/g, "")
                              .replace(/\\dfrac/g, "");

    calculator.setExpression({ id: 'graph1', latex: parsedMath });
}

// NCERT Quiz Generator
let quizQuestions = [
    { question: "What is the derivative of x²?", answer: "2x" },
    { question: "Integrate x dx", answer: "x^2/2 + C" }
];

function generateQuiz() {
    let randomIndex = Math.floor(Math.random() * quizQuestions.length);
    document.getElementById("quizQuestion").innerText = quizQuestions[randomIndex].question;
    document.getElementById("quizAnswer").dataset.correct = quizQuestions[randomIndex].answer;
}

function checkQuiz() {
    let userAnswer = document.getElementById("quizAnswer").value;
    let correctAnswer = document.getElementById("quizAnswer").dataset.correct;
    let feedback = document.getElementById("quizFeedback");

    if (userAnswer.trim() === correctAnswer) {
        feedback.innerText = "✅ Correct!";
        feedback.style.color = "green";
    } else {
        feedback.innerText = `❌ Incorrect! Correct answer: ${correctAnswer}`;
        feedback.style.color = "red";
    }
}
