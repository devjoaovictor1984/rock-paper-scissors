// Variáveis para pontuação
let playScoreHuman = 0;
let playScoreComputer = 0;
const winnerScore = 5; // Primeiro a alcançar 5 pontos vence

// Seleciona os elementos do DOM
const humanScoreSpan = document.querySelector('.human span');
const computerScoreSpan = document.querySelector('.machine span');
const resultDiv = document.querySelector('.winner');
const countdownDiv = document.querySelector('.jogo-started');
const buttons = document.querySelectorAll('.ppt-div button');

// Função para escolha aleatória do computador
function getComputerChoice() {
    let randomNum = Math.random();
    if (randomNum < 0.33) {
        return 'ROCK';
    } else if (randomNum < 0.66) {
        return 'PAPER';
    } else {
        return 'SCISSORS';
    }
}

// Função para determinar o vencedor da rodada
function determineWinner(human, computer) {
    if (human === computer) {
        console.log(`Empate! Ambos escolheram ${human}.`);
        return 'tie';
    } else if (
        (human === 'ROCK' && computer === 'SCISSORS') ||
        (human === 'SCISSORS' && computer === 'PAPER') ||
        (human === 'PAPER' && computer === 'ROCK')
    ) {
        console.log(`Você venceu esta rodada! ${human} vence ${computer}.`);
        return 'human';
    } else {
        console.log(`Computador venceu esta rodada! ${computer} vence ${human}.`);
        return 'computer';
    }
}

// Função para atualizar a interface de resultados e exibir pontuação no console
function updateScoreboard() {
    humanScoreSpan.textContent = playScoreHuman;
    computerScoreSpan.textContent = playScoreComputer;

    console.log(`Placar Atual: Humano ${playScoreHuman} x ${playScoreComputer} Computador`);

    // Verifica se alguém atingiu 5 pontos primeiro
    if (playScoreHuman === winnerScore) {
        resultDiv.textContent = "🎉 Você venceu o jogo!";
        console.log("🎉 Você venceu o jogo!");
        startCountdown();
    } else if (playScoreComputer === winnerScore) {
        resultDiv.textContent = "💻 O computador venceu o jogo!";
        console.log("💻 O computador venceu o jogo!");
        startCountdown();
    }
}

// Função para iniciar a contagem regressiva antes de resetar o jogo
function startCountdown() {
    let countdown = 5;
    countdownDiv.textContent = `Reiniciando em ${countdown}...`;
    
    let interval = setInterval(() => {
        countdown--;
        countdownDiv.textContent = `Reiniciando em ${countdown}...`;

        if (countdown === 0) {
            clearInterval(interval);
            resetGame();
        }
    }, 1000);
}

// Função que reseta o jogo
function resetGame() {
    playScoreHuman = 0;
    playScoreComputer = 0;
    resultDiv.textContent = "Faça sua escolha!";
    countdownDiv.textContent = ""; // Limpa a contagem regressiva
    console.log("O jogo foi reiniciado.");
    updateScoreboard();
}

// Função que gerencia cada rodada ao clicar em um botão
function playRound(event) {
    let humanChoice = event.target.id.toUpperCase();
    let computerChoice = getComputerChoice();

    console.log(`Você escolheu: ${humanChoice}`);
    console.log(`O computador escolheu: ${computerChoice}`);

    let roundWinner = determineWinner(humanChoice, computerChoice);

    if (roundWinner === 'human') {
        playScoreHuman++;
        resultDiv.textContent = `🎉 Você venceu! ${humanChoice} vence ${computerChoice}`;
    } else if (roundWinner === 'computer') {
        playScoreComputer++;
        resultDiv.textContent = `💻 O computador venceu! ${computerChoice} vence ${humanChoice}`;
    } else {
        resultDiv.textContent = `🤝 Empate! Ambos escolheram ${humanChoice}`;
    }

    updateScoreboard();
}

// Adiciona event listeners aos botões
buttons.forEach(button => {
    button.addEventListener('click', playRound);
});
