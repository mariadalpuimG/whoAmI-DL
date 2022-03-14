// open and close rules buttons in main page
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

// ask for username and store in local storage
let storedUsername;
// select a username and console log it
submitUsername = (e) => {
    storedUsername = {
    username: document.querySelector("#username").value,
  };

  console.log(storedUsername);
// store the selected username in local storage
  storedUsername = JSON.stringify(storedUsername);
  //Set the value of the specified local storage item
  sessionStorage.setItem("SessionUsername", storedUsername);
  console.log(sessionStorage.getItem("SessionUsername"));
   e.preventDefault();
};

document.querySelector("#usernameForm")?.addEventListener("submit", submitUsername);

// submit only available if anything is written
const username = document.getElementById('username');
const submitUsernameBtn = document.getElementById('btnSubmit');

submitEnabled = () => {
console.log(username.value)
    submitUsernameBtn.disabled = !username.value;
};

document.getElementById('username')?.addEventListener('keyup', submitEnabled)

// start is only enabled when it's submitted
const start = document.getElementById('btnStart');

startEnabled = () => {
    start.style.display = "block";
};

document.getElementById('btnSubmit')?.addEventListener('click', startEnabled)


// ---------------------- QUIZ PAGE
// get username showing in quiz page
let activeUser = document.getElementById('usernameActive');
let retrievedData;

// retrieve the value username of the data stored and use it
// to change the innetHTML of the player
printFunc = () => {
    retrievedData = sessionStorage.getItem("SessionUsername");
    retrievedData = JSON.parse(retrievedData);
    console.log(retrievedData.username);

    if (activeUser) activeUser.innerHTML = retrievedData.username;  
  };
  
  printFunc();

// questions and game
console.log(document.getElementById('sentenceQuote'))

const sentence = document.getElementById('sentenceQuote');
// const sentenceNum = document.getElementById('sentenceNumber');
const choicePhoto = Array.from(document.getElementsByClassName('choicePhoto'));
const choiceName = Array.from(document.getElementsByClassName('choiceName'));
const choiceContainer = Array.from(document.getElementsByClassName('choiceContainer'));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const scoreText = document.getElementById('scoreText');
const usernameActive = document.getElementById('usernameActive');

console.log(sentence)
console.log(choicePhoto)
console.log(choiceName)

let currentQuestion = {};
// don't want to accept answers until we have the question run
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// not working, looking at this later
// start with empty arran of questions to then import them from json file
// let questions = [];

// fetch("/_data/questions-data.json")
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data);
//         questions = data;
//         startGame();
//     });


let questions = [
    {
        sentence: `"I am not good at reading instructions."`,
        choicePhoto1: "./imgs/photos/jack-rounded.png",
        choiceName1: "Jack W.",
        choicePhoto2: "./imgs/photos/katharine-rounded.png",
        choiceName2: "Katharine",
        choicePhoto3: "./imgs/photos/jonathan-rounded.png",
        choiceName3: "Jonathan",
        answer: 1
    },
    {
         sentence: `"The “most royal” person that was in touching distance of me was Queen Beatrix of the Netherlands."`,
         choicePhoto1: "./imgs/photos/sarah-rounded.png",
         choiceName1: "Sarah D.",
         choicePhoto2: "./imgs/photos/valerio-rounded.png",
         choiceName2: "Valerio",
         choicePhoto3: "./imgs/photos/jaanki-rounded.png",
         choiceName3: "Jaanki",
         answer: 2
    },
    {
        sentence: `"I have performed a piano concerto at West Road Concert Hall in Cambridge."`,
        choicePhoto1: "./imgs/photos/Tom-A-rounded.png",
        choiceName1: "Tom A.",
        choicePhoto2: "./imgs/photos/matt-j-rounded.png",
        choiceName2: "Matt J.",
        choicePhoto3: "./imgs/photos/richard-o-rounded.png",
        choiceName3: "Richard O.",
        answer: 3
    },
    // {
    //     sentence: `"I am a qualified Expedition Leader in Amazon Rainforest 😎 (it is expired now)"`,
    //     choicePhoto1: "./imgs/photos/Benny-Mansfield-rounded.png",
    //     choiceName1: "Benny",
    //     choicePhoto2: "./imgs/photos/matt-rounded.png",
    //     choiceName2: "Matt D.",
    //     choicePhoto3: "./imgs/photos/aimee-rounded.png",
    //     choiceName3: "Aimee",
    //     answer: 1
    // },
    // {
    //     sentence: `"I once piloted a Royal Navy Frigate along the Essex and Suffolk coast."`,
    //     choicePhoto1: "./imgs/photos/hannah-rounded.png",
    //     choiceName1: "Hannah",
    //     choicePhoto2: "./imgs/photos/ian-e-rounded.png",
    //     choiceName2: "Ian E.",
    //     choicePhoto3: "./imgs/photos/james-p-rounded.png",
    //     choiceName3: "James",
    //     answer: 2
    // },
    // {
    //     sentence: `"I went on a blind date and have an article on The Guardian about it. Hint: My hair grew a lot since."`,
    //     choicePhoto1: "./imgs/photos/toby-rounded.png",
    //     choiceName1: "Toby",
    //     choicePhoto2: "./imgs/photos/Joe-s-rounded.png",
    //     choiceName2: "Joe S.",
    //     choicePhoto3: "./imgs/photos/jaime-rounded.png",
    //     choiceName3: "Jaime",
    //     answer: 3
    // },
    // {
    //     sentence: `"My Dads ex Wife's New Husband's Dog was Pickles, the dog who found the world cup."`,
    //     choicePhoto1: "./imgs/photos/ben-rounded.png",
    //     choiceName1: "Ben T.",
    //     choicePhoto2: "./imgs/photos/thomas-giffin-round.png",
    //     choiceName2: "Thomas G.",
    //     choicePhoto3: "./imgs/photos/dan-y-rounded.png",
    //     choiceName3: "Dan Y.",
    //     answer: 1
    // },
    // {
    //     sentence: `"I've played both Macduff in Macbeth and Tracy in Hairspray on stage."`,
    //     choicePhoto1: "./imgs/photos/nicole-rounded (1).png",
    //     choiceName1: "Nicole F.",
    //     choicePhoto2: "./imgs/photos/valerie-rounded.png",
    //     choiceName2: "Valerie",
    //     choicePhoto3: "./imgs/photos/sian-rounded.png",
    //     choiceName3: "Sian",
    //     answer: 2
    // },
    // {
    //     sentence: `"I lived for nearly an year in the Dominican Republic during and because of the pandemic,... also I come back married."`,
    //     choicePhoto1: "./imgs/photos/spencer-rounded.png",
    //     choiceName1: "Spencer",
    //     choicePhoto2: "./imgs/photos/nicola-sd-rounded.png",
    //     choiceName2: "Nicola",
    //     choicePhoto3: "./imgs/photos/maria-rounded.png",
    //     choiceName3: "Maria",
    //     answer: 3
    // },
    // {
    //     sentence: `"I have lived in different 5 countries"`,
    //     choicePhoto1: "./imgs/photos/ben-s-rounded.png",
    //     choiceName1: "Ben S.",
    //     choicePhoto2: "./imgs/photos/tatsiana-rounded.png",
    //     choiceName2: "Tatsiana",
    //     choicePhoto3: "./imgs/photos/maria-rounded.png",
    //     choiceName3: "Maria",
    //     answer: 1
    // },
    // {
    //     sentence: `"I can juggle 5 balls 🤹"`,
    //     choicePhoto1: "./imgs/photos/ryan-rounded.png",
    //     choiceName1: "Ryan",
    //     choicePhoto2: "./imgs/photos/gwilym-rounded.png",
    //     choiceName2: "Gwilym",
    //     choicePhoto3: "./imgs/photos/kevin-rounded.png",
    //     choiceName3: "Kevin",
    //     answer: 2
    // },
    // {
    //     sentence: `"I once passed out in a full Pudsey Bear costume at an official event celebrating Children in Need..."`,
    //     choicePhoto1: "./imgs/photos/meg-rounded.png",
    //     choiceName1: "Meg",
    //     choicePhoto2: "./imgs/photos/stephen-rounded.png",
    //     choiceName2: "Stephen C.",
    //     choicePhoto3: "./imgs/photos/holly-w-rounded.png",
    //     choiceName3: "Holly W.",
    //     answer: 3
    // },
    // {
    //     sentence: `"I once had dinner with George Clooney."`,
    //     choicePhoto1: "./imgs/photos/Luke-h-rounded.png",
    //     choiceName1: "Luke H.",
    //     choicePhoto2: "./imgs/photos/ben-r-rounded.png",
    //     choiceName2: "Ben R.",
    //     choicePhoto3: "./imgs/photos/casey-rounded.png",
    //     choiceName3: "Casey",
    //     answer: 1
    // },
];

const CORRECT_POINTS = 10;
// only doing this if I have many questions
// and only want to use a few per game
// const MAX_QUESTIONS = 10;

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
    // save score in localstorage
    sessionStorage.setItem("mostRecentScore", scoreText.innerText);
    console.log(sessionStorage.getItem("mostRecentScore"));
    // e.preventDefault();

        return window.location.assign("/whoAmI-DLresults.html");
    }
    questionCounter++;
    if (progressText) progressText.innerText = `Question ${questionCounter}/${questions.length}`;
    // update progress bar
    console.log(`${(questionCounter / questions.length) * 100}px;`)
    if (progressBarFull) progressBarFull.style.width = `${(questionCounter / questions.length) * 100}%`;
    // gets a random integer number between 0 and number of questions (length)
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    // assigns to currentquestion a random (questionIndex) availablequestion 
    currentQuestion = availableQuestions[questionIndex];
    if (sentence) sentence.innerText = currentQuestion.sentence;

    // adds a number based on the questionCounter - not needed for now as the count is in the bottom
    // if (sentenceNum) sentenceNum.innerText = `#${questionCounter}`;

    // if I want max questions
    // sentenceNum.innerText = `#${questionCounter}/${MAX_QUESTIONS}`;

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

        if (classToApply === 'correct') {
            incrementScore(CORRECT_POINTS);
        }
        console.log(classToApply)

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
        }, 500);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
    console.log(score)

            // // save score in localstorage
            // sessionStorage.setItem("mostRecentScore", scoreText.innerText);
            // console.log(sessionStorage.getItem("mostRecentScore"));
            // e.preventDefault();
};

startGame();

// ---------------- results page
// get username showing in quiz page
let usernameResults = document.getElementById('usernameResults');

// retrieve the value username of the data stored and use it
// to change the innetHTML of the username
printFunc = () => {
    retrievedData = sessionStorage.getItem("SessionUsername");
    retrievedData = JSON.parse(retrievedData);
    console.log(retrievedData.username);

    usernameResults.innerHTML = retrievedData.username; 
  };
  
  printFunc();


  // get score showing in quiz page
let finalScore = document.getElementById('finalScore');
let retrievedScore

// retrieve the score and showw
//WAITING FOR VIDEO TO TEACH ME
printFunc = () => {
    retrievedScore = sessionStorage.getItem("mostRecentScore");
    retrievedScore = JSON.parse(retrievedScore);
    console.log(retrievedScore);

    finalScore.innerHTML = `${retrievedScore} points`; 
  };
  
  printFunc();


    // get correct answers showing in quiz page
let correctAnswers = document.getElementById('correctAnswers');
let retrievedCorrectAnswers;

// retrieve the number of correct answers and show
printFunc = () => {
    console.log(retrievedScore)
    retrievedCorrectAnswers = (retrievedScore/10);
    console.log(retrievedCorrectAnswers);

console.log(questions.length)
    correctAnswers.innerHTML = `${retrievedCorrectAnswers}/${questions.length} correct`; 
  };
  
  printFunc();

// save score and information in the form
usernameResults
finalScore

const btnSaveScore = document.getElementById('saveScore');

saveScoreFunc = (e) => {
    console.log("score saved")
    e.preventDefault();
    btnSaveScore.style.color = "red";
};

// adding Optional chaining so it doesn't fail when on next page
document.getElementById('saveScore')?.addEventListener('click', saveScoreFunc)

// open and close view answers in results page
console.log(document.getElementById('answersBox'));

const btnOpenCloseAnswers = document.getElementById('answersBox');

openAnswersBox = () => {
    btnOpenCloseAnswers.style.display = "block";
};

closeAnswersBox = () => {
    btnOpenCloseAnswers.style.display = "none";
};

// adding Optional chaining so it doesn't fail when on next page
document.getElementById('btnViewAnswers')?.addEventListener('click', openAnswersBox)
document.getElementById('btnCloseAnswers')?.addEventListener('click', closeAnswersBox)
