// // open and close rules buttons in main page
console.log(document.getElementById('playBox'));

const btnOpenClose = document.getElementById('playBox');

openBox = () => {
    btnOpenClose.style.display = "block";
};

closeBox = () => {
    btnOpenClose.style.display = "none";
};

// adding Optional chaining so it doesn't fail when on next page
document.getElementById('btnPlay')?.addEventListener('click', openBox)
document.getElementById('btnClose')?.addEventListener('click', closeBox)



// quiz page
console.log(document.getElementById('sentenceQuote'))

const sentence = document.getElementById('sentenceQuote');
const choicePhoto = Array.from(document.getElementsByClassName('choicePhoto'));
const choiceName = Array.from(document.getElementsByClassName('choiceName'));

console.log(sentence)
console.log(choicePhoto)
console.log(choiceName)

let currentQuestion = {};
// don't want to accept answers until we have the question run
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// I want to replace this with a data file
// check if the answer number is zero based
let questions = [
    // {
    //     sentence: `"I am not good at reading instructions."`,
    //     choicePhoto1: "../imgs/photos/jack-rounded.png",
    //     choiceName1: "Jack Weatherly",
    //     choicePhoto2: "../imgs/photos/katharine-rounded.png",
    //     choiceName2: "Katharine Darbishire",
    //     choicePhoto2: "../imgs/photos/jonathan-rounded.png",
    //     choiceName3: "Jonathan Plumridge",
    //     answer: 1
    // },
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
];

const CORRECT_POINTS = 10;
// only doing this if I have many questions
// and only want to use a few per game
// const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    // this copies all the questions from the array with a spread operator
    // this does pick each of this objects and put them in an array
    availableQuestions = [...questions];
    // console.log(availableQuestions.length)
    console.log(availableQuestions)
    getNewQuestion();
};

getNewQuestion = () => {
    questionCounter++;
    // gets a random integer number between 0 and number of questions (length)
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    // assigns to currentquestion a random (questionIndex) availablequestion 
    currentQuestion = availableQuestions[questionIndex];
    sentence.innerText = currentQuestion.sentence;

    // for each choice choicePhoto, iterate through it, get a reference
    // each choice and inside it we get a number (from the data set property we set)
    // that willl refer to each choice for the question
    choiceName.forEach(choiceName => {
        const numberName = choiceName.dataset['number'];
        // for the choice we are at, replace it's text with the current choice number
        // for that current question
        choiceName.innerText = currentQuestion['choice' + numberName];
        
    });

    // choicePhoto.forEach(choicePhoto => {
    //     const numberPhoto = choicePhoto.dataset['number'];
    //     // for the choice we are at, replace it's text with the current choice number
    //     // for that current question
    //     console.log(choicePhoto.src)
    //     choicePhoto.src = `${currentQuestion['choice' + numberPhoto]}`;
    //     // document.getElementById("").src = "hackanm.gif";
    // });

    // Remove 1 element before question in questionIndex
    // takes out from available the question just used
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

startGame()


