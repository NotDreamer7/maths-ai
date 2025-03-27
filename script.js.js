// Initialize MathQuill
var MQ = MathQuill.getInterface(2);
var mathFieldSpan = document.getElementById('math-field');
var mathField = MQ.MathField(mathFieldSpan, {
    spaceBehavesLikeTab: true
});

// Solve Math Problem
function solveMath() {
    let input = mathField.latex();
    let parsedInput = input.replace(/\\cdot/g, '*');
    let chapter = document.getElementById("chapterSelect").value;
    let steps = "";

    try {
        let result = math.evaluate(parsedInput);

        if (chapter === "calculus") {
            if (input.includes("diff")) {
                let expression = input.replace("diff", "");
                let derivative = nerdamer(`diff(${expression}, x)`).toString();
                steps = `1️⃣ Apply power rule. <br> 2️⃣ Differentiate each term. <br> 3️⃣ Final answer: \\( ${derivative} \\)`;
                result = derivative;
            } else if (input.includes("int")) {
                let expression = input.replace("int", "");
                let integral = nerdamer(`integrate(${expression}, x)`).toString();
                steps = `1️⃣ Apply integration formulas. <br> 2️⃣ Final answer: \\( ${integral} + C \\)`;
                result = integral + " + C";
            }
        }

        document.getElementById("solution").innerHTML = `<p>Solution: \\(${parsedInput} = ${result}\\)</p><p>Steps:</p><p>${steps || "N/A"}</p>`;
        katex.render(parsedInput, document.getElementById("solution"));
    } catch (error) {
        document.getElementById("solution").innerText = "Invalid Input!";
    }
}

// Graphing with Desmos
var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);

function plotGraph() {
    let input = mathField.latex();
    calculator.setExpression({ id: 'graph1', latex: input });
}

// NCERT Quiz
const quizQuestions = [
    { question: "Find the derivative of x^2", answer: "2x" },
    { question: "Solve for x: x^2 - 4 = 0", answer: "±2" },
    { question: "Integrate x^2", answer: "(1/3)x^3 + C" }
];

function generateQuiz() {
    let randomIndex = Math.floor(Math.random() * quizQuestions.length);
    document.getElementById("quizQuestion").innerText = quizQuestions[randomIndex].question;
    document.getElementById("quizAnswer").dataset.correct = quizQuestions[randomIndex].answer;
}

function checkAnswer() {
    let userAnswer = document.getElementById("quizAnswer").value;
    let correctAnswer = document.getElementById("quizAnswer").dataset.correct;
    document.getElementById("quizFeedback").innerText = (userAnswer === correctAnswer) ? "✅ Correct!" : "❌ Incorrect. Answer: " + correctAnswer;
}
