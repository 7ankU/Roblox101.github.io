// Fisher-Yates shuffle algorithm
function shuffle(anyList)
{
    for(let i = anyList.length - 1; i > 0; i--)
    {
        // pick a random index for the second last element
        const j = Math.floor(Math.random() * (i + 1));
        [anyList[i], anyList[j]] = [anyList[j], anyList[i]];
    }
    return anyList;
}



// Initialize data storage
const quizData = [
    {
        question : "What year was Roblox released?",
        options : ["2003", "2004", "2006", "2012", "2014"],
        answer : "2006",
        extraInfo : "Roblox was first released on PC on September 1, 2006."
    },

    {
        question : "Who is a founder of Roblox?",
        options : ["Erick Cassel", "Eric Cassel", "David Baszucki"],
        answer : "David Baszucki",
        extraInfo : "The 2 founders of Roblox are Erik Cassel and DAVID BASZUCKI."
    },

    {
        question : "What coding language was Roblox written in?",
        options : ["Python", "C++", "Lua", "Javascript"],
        answer : "C++",
        extraInfo : "While Roblox games and experiences are written in Lua, Roblox itself was written in mainly C++."
    },

    {
        question : "What is the name of Shedletsky's alternate account?",
        options : ["Builderman", "Telamon", "1x1x1x1", "Clockwork"],
        answer : "Telamon",
        extraInfo : "Telamon is an inactive alternate account of Shedletsky. It was used for a few years and then swapped IDs in favor of his main account, Shedletsky."
    },

    {
        question : "What is the most visited experience in Roblox as of 2024?",
        options : ["Adopt Me!", "Blox Fruits", "Brookhaven RP", "Tower of Hell", "MeepCity"],
        answer : "Brookhaven RP",
        extraInfo : "Brookhaven RP, created by Wolfpaq, is the most visited experience in Roblox as of May 2024 with around 47.4 billion visits."
    },
    
    {
        question : "How many experiences participated in the Roblox event The Hunt: First Edition?",
        options : ["15", "30", "50", "95", "100"],
        answer : "100",
        extraInfo : "There are 100 participating experiences for The Hunt: First Edition, each of which with a badge that will contribute progress to the event."
    }, 

    {
        question : "What is not a UGC for the newly released Roblox event, The Classic?",
        options : ["Vault Holo-compass", "Ancient Deity Shawl", "Kleos Erebus", "Empyrean Reign of Awesomeness"],
        answer : "Vault Holo-compass",
        extraInfo : "The free UGCs that can be obtained from The Classic are the Ancient Deity Shawl, Empyrean Reign of Awesomeness, Agonizingly Happy Bucket, and Kleos Erebus. The Vault Holo-compass came from another Roblox event known as The Hunt: First Edition."
    },

    {
        question : "What experience did not participate in both The Classic and The Hunt: First Edition?",
        options : ["Gunfight Arena", "Dragon Adventures", "Clip It", "Restaurant Tycoon 2"],
        answer : "Clip It",
        extraInfo : "Clip It has participated in The Classic but not in The Hunt: First Edition."
    }
];

const questionElement = document.getElementById("question");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const timerText = document.getElementById("timerText");
const progressBar = document.getElementById("progress-bar");
const progressBarContainer = document.getElementById("progress-bar-container");
const optionsContainer = document.getElementById("option-container");
const resultElement = document.getElementById("result");
const timerSettings = document.getElementById("timer-settings");
const timerSettingsLabel = document.getElementById("timer-settings-label");
const feedbackLabel = document.getElementById("feedback");

//Initialize progress bar to 0% before the quiz starts
progressBar.style.width = "0%";

startButton.addEventListener("click", startQuiz);

let current_index = 0;
let score = 0;
let countdownTime = parseInt(timerSettings.value);

// update countdown time when dropdown value changes
timerSettings.addEventListener("change", () => {
    countdownTime = parseInt(timerSettings.value);
    timerText.textContent = countdownTime;
});

function startQuiz()
{
    startButton.style.display = "none"; // to hide the start button
    timerSettings.style.display = "none";
    timerSettingsLabel.style.display = "none";
    shuffle(quizData);
    loadQuestion();
}

function loadQuestion()
{
    clearInterval(timer);

    if(current_index < quizData.length) 
    {
        timerText.textContent = countdownTime;

        progressBar.style.width = `${((current_index + 1) / quizData.length) * 100}%`;
        
        const currentQuestionSet = quizData[current_index];
        questionElement.textContent = currentQuestionSet.question;

        // remove previous button clones
        optionsContainer.innerHTML = "";
        
        // Clone a button for each option
        currentQuestionSet.options.forEach((option) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option-btn");
            optionsContainer.appendChild(button);

            button.addEventListener("click", () => {
                checkAnswer(option);
            });
        });


        // Create a timer object using setInterval() function
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                // reset timer
                clearInterval(timer);
                showFeedback(null);
            }
        }, 1000);
    } else 
    {
        endQuiz();
    }
}

function checkAnswer(option)
{
    const answer = quizData[current_index].answer;
    if(option === answer)
    {
        score++;
    }
    resultElement.textContent = `You scored ${score} point(s)`;
    //current_index++;
    //loadQuestion();
    clearInterval(timer);
    showFeedback(option);
}

function showFeedback(option)
{
    const currentQuizData = quizData[current_index];
    let feedback = "";

    if(option === currentQuizData.answer)
    {
        feedback = `Correct! ${currentQuizData.extraInfo}`;
    } else if (option === null)
    {
        feedback = `Time's up! The correct answer was ${currentQuizData.answer}. ${currentQuizData.extraInfo}`;
    } else
    {
        feedback = `Incorrect! The correct answer was ${currentQuizData.answer}. ${currentQuizData.extraInfo}`;
    }

    feedbackLabel.textContent = feedback;

    setTimeout(() => {
        current_index++; // ++ increases current_index by 1
        loadQuestion();
        feedbackLabel.textContent = "";
    }, 6000);
}

function endQuiz()
{
    clearInterval(timer);

    progressBarContainer.style.display = "none";
    optionsContainer.style.display = "none";
    timerElement.style.display = "none"
    feedbackLabel.textContent = "";
    questionElement.textContent = "You've finished the quiz! Yayyyyyyyyyyy!";
}
