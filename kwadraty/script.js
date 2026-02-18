 // DOM Elements
const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const boardSizeInput = document.getElementById('board-size');
const timeLimitInput = document.getElementById('time-limit');
const startBtn = document.getElementById('start-btn');
const restoreDefaultsBtn = document.getElementById('restore-defaults-btn');
const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer-display');
const resultMessage = document.getElementById('result-message');
const resetBtn = document.getElementById('reset-btn');
const menuBtn = document.getElementById('menu-btn');
const boardContainer = document.getElementById('board-container');

// Game State
let boardSize = 10;
let timeLimit = 60;
let timeLeft = 60;
let expectedNumber = 0;
let timerInterval = null;
let isGameActive = false;

// Initialization
function init() {
    startBtn.addEventListener('click', startGame);
    restoreDefaultsBtn.addEventListener('click', restoreDefaults);
    resetBtn.addEventListener('click', resetGame);
    menuBtn.addEventListener('click', showMenu);
    window.addEventListener('resize', handleResize);
    handleResize();
}

function restoreDefaults() {
    boardSizeInput.value = 10;
    timeLimitInput.value = 60;
}

function startGame() {
    boardSize = parseInt(boardSizeInput.value) || 10;
    timeLimit = parseInt(timeLimitInput.value) || 60;
    
    menuScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    initGame();
}

function initGame() {
    isGameActive = true;
    expectedNumber = 0;
    timeLeft = timeLimit;
    timerDisplay.textContent = timeLeft;
    timerDisplay.classList.remove('hidden');
    resultMessage.classList.add('hidden');
    boardContainer.classList.remove('hidden');
    
    generateBoard();
    startTimer();
    handleResize();
}

function generateBoard() {
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

    const totalCells = boardSize * boardSize;
    const numbers = Array.from({ length: totalCells }, (_, i) => i);
    shuffleArray(numbers);

    numbers.forEach(num => {
        const btn = document.createElement('button');
        btn.classList.add('board-btn');
        btn.textContent = num;
        btn.addEventListener('click', () => handleCellClick(num, btn));
        gameBoard.appendChild(btn);
    });
}

function shuffleArray(array) {
    // Using Crypto for "SecureRandom" equivalent
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function handleCellClick(num, btn) {
    if (!isGameActive) return;

    if (num === expectedNumber) {
        btn.classList.add('correct');
        expectedNumber++;
        
        if (expectedNumber === boardSize * boardSize) {
            winGame();
        }
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            loseGame();
        }
    }, 1000);
}

function winGame() {
    stopGame();
    boardContainer.classList.add('hidden');
    timerDisplay.classList.add('hidden');
    
    resultMessage.textContent = `Zrobiłeś board = ${boardSize}\nw ${timeLimit - timeLeft} s`;
    resultMessage.classList.remove('hidden');
}

function loseGame() {
    stopGame();
    boardContainer.classList.add('hidden');
    timerDisplay.classList.add('hidden');
    
    resultMessage.textContent = `Twój wynik: ${expectedNumber}\nboard = ${boardSize}`;
    resultMessage.classList.remove('hidden');
}

function stopGame() {
    isGameActive = false;
    clearInterval(timerInterval);
}

function resetGame() {
    initGame();
}

function showMenu() {
    stopGame();
    gameScreen.classList.add('hidden');
    menuScreen.classList.remove('hidden');
}

function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Dynamic Scaling logic
    const baseUnit = Math.min(width / 1920, height / 1080);
    const fontSize = Math.max(12, 20 * baseUnit);
    
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    // Board scaling - keep it square and fitting
    if (!gameScreen.classList.contains('hidden')) {
        const boardWrapper = document.querySelector('.game-container');
        const containerWidth = boardWrapper.clientWidth * 0.7; // Approx 70% for board area
        const containerHeight = boardWrapper.clientHeight * 0.95;
        const boardSide = Math.min(containerWidth, containerHeight);
        
        boardContainer.style.width = `${boardSide}px`;
        boardContainer.style.height = `${boardSide}px`;
        
        // Font size on board buttons
        const boardBtns = document.querySelectorAll('.board-btn');
        const btnFontSize = (boardSide / boardSize) * 0.4;
        boardBtns.forEach(btn => {
            btn.style.fontSize = `${btnFontSize}px`;
        });
    }

    // Specific scalings from prompt
    const h1 = document.querySelector('#menu-screen h1');
    if (h1) h1.style.fontSize = `${fontSize * 3}px`;
    
    const largeTexts = document.querySelectorAll('.large-text');
    largeTexts.forEach(lt => {
        lt.style.fontSize = `${fontSize * 4}px`;
    });
}

init();
