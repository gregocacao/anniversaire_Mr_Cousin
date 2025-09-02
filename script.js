const questions = [
    // Vos questions restent ici, inchangées
    {
        question: "1. En quelle année le Stade Lavallois a-t-il été officiellement fondé par Joseph Gemain?",
        options: ["A) 1898", "B) 1902", "C) 1918"],
        correctAnswer: "B) 1902",
        image: "photo_1.jpg"
    },
    {
        question: "2. Quel est le surnom emblématique des joueurs du Stade Lavallois, inspiré par la couleur de leur maillot?",
        options: ["A) Les Canaris", "B) Les Merlus", "C) Les Tangos"],
        correctAnswer: "C) Les Tangos",
        image: "photo_2.jpg"
    },
    {
        question: "3. Quel entraîneur légendaire, reconnaissable à sa casquette, a dirigé le club pendant son âge d'or en Division 1 de 1976 à 1989?",
        options: ["A) Raymond Kéruzoré", "B) Michel Le Milinaire", "C) Jean Barré"],
        correctAnswer: "B) Michel Le Milinaire",
        image: "photo_3.jpg"
    },
    {
        question: "4. Lors de sa seule épopée européenne en Coupe UEFA 1983-1984, quel prestigieux club soviétique le Stade Lavallois a-t-il créé l'exploit d'éliminer au premier tour?",
        options: ["A) Spartak Moscou", "B) Dynamo Kiev", "C) Zénith Léningrad"],
        correctAnswer: "B) Dynamo Kiev",
        image: "photo_4.jpg"
    },
    {
        question: "5. Qui est le meilleur buteur de l'histoire du Stade Lavallois en Division 1/Ligue 1?",
        options: ["A) Georg Tripp", "B) Uwe Krause", "C) Patrick Delamontagne"],
        correctAnswer: "B) Uwe Krause",
        image: "photo_5.jpg"
    },
    {
        question: "6. En quelle année le Stade Lavallois a-t-il remporté la Coupe Gambardella, le grand trophée national pour les équipes de jeunes?",
        options: ["A) 1984", "B) 1976", "C) 1993"],
        correctAnswer: "A) 1984",
        image: "photo_6.jpg"
    },
    {
        question: "7. Avant d'adopter définitivement la couleur 'Tango' en 1923, quelles étaient les couleurs des tout premiers maillots du club lors de son match inaugural en 1902?",
        options: ["A) Bleu et Blanc", "B) Vert et Blanc", "C) Noir et Rouge"],
        correctAnswer: "C) Noir et Rouge",
        image: "photo_7.jpg"
    },
    {
        question: "8. Quel joueur détient le record du plus grand nombre de matchs officiels disputés sous le maillot lavallois?",
        options: ["A) Jean-Marc Miton", "B) Mickaël Buzaré", "C) Anthony Gonçalves"],
        correctAnswer: "B) Mickaël Buzaré", 
        image: "photo_8.jpg"
    },
    {
        question: "9. Contre quelle équipe le Stade Lavallois a-t-il joué son tout premier match, une défaite 6-0 en novembre 1902?",
        options: ["A) Le Mans Union Club 72", "B) Angers SCO", "C) Stade Rennais"],
        correctAnswer: "C) Stade Rennais",
        image: "photo_9.jpg"
    },
    {
        question: "10. Qui est le meilleur buteur de l'histoire du club toutes compétitions officielles confondues, un record souvent méconnu datant de l'époque amateur?",
        options: ["A) Uwe Krause", "B) Guilherme Mauricio", "C) Jean-François Fort"],
        correctAnswer: "C) Jean-François Fort", 
        image: "photo_10.jpg"
    }
];

const quizPageContainer = document.getElementById('quiz-page-container');
const introPage = document.getElementById('intro-page');
const startQuizButton = document.getElementById('start-quiz-button');
let currentQuestionIndex = 0;

let totalErrors = 0;
const errorMessages = [
    "Allez Benoit, pas de souci, c'est la question d'échauffement. Tout le monde peut se tromper !",
    " Encore ? Étonnant. Ce n’était pas là plus dure pourtant, celle-là. ",
    " Sérieusement, rends l'écharpe. Tu ne la mérites pas. ",
    " Le mec est nul en fait ? C'est ça, supporter Laval ? Ça explique le niveau. ", 
    " 5ème Erreur, ce n’est pas possible, ton QI doit être équivalent au nombre de buts que Laval marque par saison. ",
    " C'est fascinant cette capacité que tu as à avoir tort sur absolument tout. ",
    " T'es une merde en fait ? C'est une vraie question. ",
    "Franchement, tu as autant d'avenir que le Stade Lavallois en Ligue 1. ",
    " Ton niveau intellectuel, c'est le secret pour apprécier un match à Le Basser ? "
    " Je n'ai plus de mots pour qualifier l'abîme de ton incompétence. Disparais, et retourne dans l'anonymat de la Ligue 2, c'est là qu'est ta place. "

];
const defaultErrorMessage = "C'est une erreur de trop. Le défi est corsé, il faut tout recommencer !";

function createQuestionPage(questionData, index) {
    const pageDiv = document.createElement('div');
    pageDiv.classList.add('quiz-page');
    pageDiv.id = `question-page-${index}`;

    const questionElement = document.createElement('h2');
    questionElement.textContent = questionData.question;
    pageDiv.appendChild(questionElement);

    const imageElement = document.createElement('img');
    imageElement.src = `./images/${questionData.image}`;
    imageElement.alt = `Photo pour la question ${index + 1}`;
    imageElement.classList.add('quiz-image');
    pageDiv.appendChild(imageElement);

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');

    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = option;
        button.onclick = () => checkAnswer(button, option, questionData.correctAnswer, pageDiv);
        optionsContainer.appendChild(button);
    });
    pageDiv.appendChild(optionsContainer);

    const feedbackMessage = document.createElement('p');
    feedbackMessage.classList.add('feedback-message');
    pageDiv.appendChild(feedbackMessage);

    const nextButton = document.createElement('button');
    nextButton.classList.add('next-button');
    nextButton.textContent = "Question Suivante";
    nextButton.style.display = 'none';
    nextButton.onclick = goToNextQuestion;
    pageDiv.appendChild(nextButton);

    return pageDiv;
}

function checkAnswer(selectedButton, selectedOption, correctAnswer, pageDiv) {
    const optionButtons = pageDiv.querySelectorAll('.option-button');
    const feedbackMessage = pageDiv.querySelector('.feedback-message');
    const nextButton = pageDiv.querySelector('.next-button');

    optionButtons.forEach(button => {
        button.disabled = true;
    });

    if (selectedOption === correctAnswer) {
        selectedButton.classList.add('correct');
        feedbackMessage.textContent = "Bonne réponse !";
        feedbackMessage.classList.remove('wrong-feedback');
        feedbackMessage.classList.add('correct-feedback');

        if (currentQuestionIndex < questions.length - 1) {
            nextButton.style.display = 'block';
        } else {
            setTimeout(displayWinPage, 1000); 
        }
    } else {
        selectedButton.classList.add('wrong');
        
        // --- MODIFICATION ICI ---
        // Le bloc de code qui révélait la bonne réponse a été supprimé.
        /*
        // ANCIEN CODE SUPPRIMÉ :
        optionButtons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            }
        });
        */
        // --- FIN DE LA MODIFICATION ---

        totalErrors++; 

        const message = errorMessages[totalErrors - 1] || defaultErrorMessage;
        feedbackMessage.textContent = message;
        
        feedbackMessage.classList.remove('correct-feedback');
        feedbackMessage.classList.add('wrong-feedback');

        const restartButton = document.createElement('button');
        restartButton.textContent = 'Recommencer';
        restartButton.classList.add('next-button', 'restart-button');
        restartButton.onclick = restartQuiz;
        pageDiv.appendChild(restartButton);
    }
}

function goToNextQuestion() {
    document.getElementById(`question-page-${currentQuestionIndex}`).classList.remove('active');
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        document.getElementById(`question-page-${currentQuestionIndex}`).classList.add('active');
    }
}

function displayWinPage() {
    const lastQuestionPage = document.getElementById(`question-page-${currentQuestionIndex}`);
    if(lastQuestionPage) {
        lastQuestionPage.classList.remove('active');
    }
    
    quizPageContainer.innerHTML = `
        <div class="win-message active quiz-page">
            <h2>Bravo Champion !</h2>
            <img src="./images/photo_11.jpg" alt="Photo de victoire" class="quiz-image">
            <p>Tu as prouvé tes connaissances et mérites amplement ton cadeau !</p>
            <div class="garmin-link-container">
                <p>Voici le lien vers ton cadeau :</p>
                <a href="https://www.garmin.com/fr-FR/p/735563" target="_blank" class="garmin-link">Découvrir le cadeau !</a>
            </div>
        </div>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;

    quizPageContainer.innerHTML = '';
    
    buildQuizPages();
    
    const firstQuestionPage = document.getElementById('question-page-0');
    if (firstQuestionPage) {
        firstQuestionPage.classList.remove('active');
    }
    introPage.classList.add('active');
}

function buildQuizPages() {
    questions.forEach((q, index) => {
        quizPageContainer.appendChild(createQuestionPage(q, index));
    });
}

function initQuiz() {
    buildQuizPages();

    startQuizButton.addEventListener('click', () => {
        introPage.classList.remove('active');
        if (questions.length > 0) {
            document.getElementById('question-page-0').classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', initQuiz);
