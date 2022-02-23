
const sentence = document.getElementById('sentenceQuote');
const choicePhoto = Array.from(document.getElementsByClassName('choicePhoto'));
const choiceName = Array.from(document.getElementsByClassName('choiceName'));

console.log(sentence)
console.log(choicePhoto)
console.log(choiceName)

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = []

// I want to replace this with a data file
// check if the answer number is zero based
let questions = [
    {
        sentence: `"I am not good at reading instructions."`,
        choice1: "Jack Weatherly",
        choice2: "Katharine Darbishire",
        choice3: "Jonathan Plumridge",
        answer: 1
    },
    {
        sentence: `"The “most royal” person that was in touching distance of me was Queen Beatrix of the Netherlands.`,
        choice1: "Sarah D.",
        choice2: "Valerio Chang",
        choice3: "Holly White",
        answer: 2
    },
    {
        sentence: `" I have performed a piano concerto at West Road Concert Hall in Cambridge.`,
        choice1: "Someone",
        choice2: "Someone",
        choice3: "Richard Owen",
        answer: 3
    }
]

const CORRECT_POINTS = 10;
// only doing this if I have many questions
// and only want to use a few per game
// const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions)
    getNewQuestion();
};

getNewQuestion = () => {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.lenght);
    currentQuestion = availableQuestions[questionIndex];
    questionCounter.innerText = currentQuestion.question;
}

startGame()


// // open and close rules buttons
console.log(document.getElementById('playBox'))

const btnOpenClose = document.getElementById('playBox');

openBox = () => {
    btnOpenClose.style.display = "block";
};

closeBox = () => {
    btnOpenClose.style.display = "none";
};

document.getElementById('btnPlay').addEventListener('click', openBox)
document.getElementById('btnClose').addEventListener('click', closeBox)

