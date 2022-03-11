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


//start only available when submit
let storedUsername;
submitUsername = (e) => {
    storedUsername = {
    username: document.querySelector("#username").value,
  };

  console.log(storedUsername);

  storedUsername = JSON.stringify(storedUsername);
  //Set the value of the specified local storage item
  sessionStorage.setItem("SessionUsername", storedUsername);
  console.log(sessionStorage.getItem("SessionUsername"));
  e.preventDefault();
};

document.querySelector("form")?.addEventListener("submit", submitUsername);




// quiz page
console.log(document.getElementById('sentenceQuote'))

const sentence = document.getElementById('sentenceQuote');
const sentenceNum = document.getElementById('sentenceNumber');
const choicePhoto = Array.from(document.getElementsByClassName('choicePhoto'));
const choiceName = Array.from(document.getElementsByClassName('choiceName'));
const choiceContainer = Array.from(document.getElementsByClassName('choiceContainer'));


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
    {
        sentence: `"I am not good at reading instructions."`,
        choicePhoto1: "./imgs/photos/jack-rounded.png",
        choiceName1: "Jack Weatherly",
        choicePhoto2: "./imgs/photos/katharine-rounded.png",
        choiceName2: "Katharine Darbishire",
        choicePhoto3: "./imgs/photos/jonathan-rounded.png",
        choiceName3: "Jonathan Plumridge",
        answer: 1
    },
    {
        sentence: `"The “most royal” person that was in touching distance of me was Queen Beatrix of the Netherlands."`,
        choicePhoto1: "./imgs/photos/sarah-rounded.png",
        choiceName1: "Sarah D.",
        choicePhoto2: "./imgs/photos/valerio-rounded.png",
        choiceName2: "Valerio Chang",
        choicePhoto3: "./imgs/photos/jaanki-rounded.png",
        choiceName3: "Jaanki Vaghela",
        answer: 2
    },
    {
        sentence: `"I have performed a piano concerto at West Road Concert Hall in Cambridge."`,
        choicePhoto1: "./imgs/photos/Tom-A-rounded.png",
        choiceName1: "Tom A.",
        choicePhoto2: "./imgs/photos/matt-j-rounded.png",
        choiceName2: "Matt J.",
        choicePhoto3: "./imgs/photos/richard-o-rounded.png",
        choiceName3: "Richard Owen",
        answer: 3
    },
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
// first if only if I want to add a limit of max questions
    // if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS)
    // this if checks if there's still available questions
    if(availableQuestions.length === 0) {
        return window.location.assign("/results.html");
    }
    questionCounter++;
    // gets a random integer number between 0 and number of questions (length)
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    // assigns to currentquestion a random (questionIndex) availablequestion 
    currentQuestion = availableQuestions[questionIndex];
    sentence.innerText = currentQuestion.sentence;

    // adds a number based on the questionCounter
    sentenceNum.innerText = `#${questionCounter}`;

    // for each choice choicePhoto, iterate through it, get a reference
    // each choice and inside it we get a number (from the data set property we set)
    // that willl refer to each choice for the question
    
    choiceName.forEach(choiceName => {
        const numberName = choiceName.dataset['number'];
        // for the choice we are at, replace it's text with the current choice number
        // for that current question
        choiceName.innerText = currentQuestion['choiceName' + numberName];
    });

    console.log(choicePhoto)
    choicePhoto.forEach(choicePhoto => {
        const numberPhoto = choicePhoto.dataset['number'];
        console.log(choicePhoto.src)
        choicePhoto.src = currentQuestion['choicePhoto' + numberPhoto];
    });

    // Remove 1 element before question in questionIndex
    // takes out from available the question just used
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

};

// choiceContainer.forEach(choice => {
//     choiceContainer?.addEventListener("click", e => {
//         console.log(e.target);

//         if(!acceptingAnswers) return;
//     });
// });

choiceContainer.forEach(choiceContainer => {
    choiceContainer?.addEventListener('click', e => {
        // The target event property returns the element that triggered the event
        console.log(e.target);
        // if not readdy to accept, we will ignore it
        // I might want to change after to return a message
        if(!acceptingAnswers) return;

        acceptingAnswers = false; 
        // checks what was clicked choiceContainer
        // selection either on photo or name, have the same
        // dataset number, attributes the number in data set to
        //selected answer
        const selectedChoice = e.target;

        const selectedAnswer = selectedChoice.dataset["number"];

        console.log(selectedAnswer)

        // detect if the answer selected is correct answer
        // by checking if the selected answer (with event listener) has the same 
        // dataset number as the currentQuestion and value answer (correct one).
        // we can't use === because we are pulling a string
        console.log(selectedAnswer == currentQuestion.answer);
        console.log(selectedChoice)

        // new variable to apply a result
        // class starts incorrect by default, but if clicked correct it 
        // changes the variable value to correct
        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        };
        // alternative method to write the same function
//         const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

// apply a class to an element, in this case apply a class
// to the parent of selected choice (whole container). This creates 
// classes and there's styling for those 2 classes (red and green)
        selectedChoice.parentElement.classList.add(classToApply);
        // but this will keep them assigned, we need to remove. but remove
        // is also permanent. we need a timeout to decide when removes (how
        // long to be delayed). And we will also do the same for getting a new answer.
        // to get a stop before it moves forward.
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
 // after I want to add an option to confirm before continue
        getNewQuestion();
        }, 10000);
    });
});

startGame()

// heads display - information about the game that we care. question we are at and 
