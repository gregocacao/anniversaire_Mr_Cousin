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

// --- NOUVEAUX AJOUTS ---
let totalErrors = 0; // Compteur global d'erreurs
const errorMessages = [
    "Aïe ! Première erreur... La route est encore longue, ne lâche rien !",
    "Deuxième erreur. On dirait que le cadeau s'éloigne un peu...",
    "Troisième erreur ! Attention, à ce rythme, le cadeau risque de rester dans sa boîte !",
    "Encore raté... Tu es sûr de bien connaître le Stade Lavallois ?!",
    "Bon, il est peut-être temps de réviser tes classiques. Tout est à refaire."
];
const defaultErrorMessage = "C'est une erreur de trop. Le défi est corsé, il faut tout recommencer !";
// --- FIN DES NOUVEAUX AJOUTS ---


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
    nextButton.style.display = 'none'; // Caché par défaut
    nextButton.onclick = goToNextQuestion;
    pageDiv.appendChild(nextButton);

    return pageDiv;
}

// --- FONCTION checkAnswer ENTIÈREMENT MISE À JOUR ---
function checkAnswer(selectedButton, selectedOption, correctAnswer, pageDiv) {
    const optionButtons = pageDiv.querySelectorAll('.option-button');
    const feedbackMessage = pageDiv.querySelector('.feedback-message');
    const nextButton = pageDiv.querySelector('.next-button');

    // Désactiver tous les boutons pour empêcher de cliquer à nouveau
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
            // C'est la dernière bonne réponse, afficher la page de victoire
            setTimeout(displayWinPage, 1000); // Ajoute un petit délai pour voir la bonne réponse
        }
    } else {
        // Logique en cas de mauvaise réponse
        selectedButton.classList.add('wrong');
        
        // Révéler la bonne réponse
        optionButtons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            }
        });

        totalErrors++; // Incrémenter le compteur d'erreurs

        // Choisir le message d'erreur en fonction du nombre total d'erreurs
        const message = errorMessages[totalErrors - 1] || defaultErrorMessage;
        feedbackMessage.textContent = message;
        
        feedbackMessage.classList.remove('correct-feedback');
        feedbackMessage.classList.add('wrong-feedback');

        // Créer et afficher le bouton "Recommencer"
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Recommencer';
        restartButton.classList.add('next-button', 'restart-button'); // Utilise le style de base + le nouveau
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
    // Masquer la dernière question pour ne montrer que la page de victoire
    const lastQuestionPage = document.getElementById(`question-page-${currentQuestionIndex}`);
    if(lastQuestionPage) {
        lastQuestionPage.classList.remove('active');
    }
    
    // Vider le conteneur pour être sûr et afficher le message de victoire
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

// --- NOUVELLE FONCTION POUR RECOMMENCER LE QUIZ ---
function restartQuiz() {
    // Réinitialiser les variables
    currentQuestionIndex = 0;
    totalErrors = 0;

    // Vider les anciennes pages de questions
    quizPageContainer.innerHTML = '';
    
    // Reconstruire les pages de questions
    buildQuizPages();
    
    // Cacher la page de questions et afficher la page d'intro
    const firstQuestionPage = document.getElementById('question-page-0');
    if (firstQuestionPage) {
        firstQuestionPage.classList.remove('active');
    }
    introPage.classList.add('active');
}

// La création des pages est maintenant dans sa propre fonction pour pouvoir être appelée au démarrage et au redémarrage
function buildQuizPages() {
    questions.forEach((q, index) => {
        quizPageContainer.appendChild(createQuestionPage(q, index));
    });
}

// Initialisation du quiz
function initQuiz() {
    buildQuizPages(); // Crée les pages au chargement initial

    startQuizButton.addEventListener('click', () => {
        introPage.classList.remove('active');
        if (questions.length > 0) {
            document.getElementById('question-page-0').classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', initQuiz);
