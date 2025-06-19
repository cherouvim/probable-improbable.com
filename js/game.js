import { phrases } from './phrases.js';

const MAX_LEVEL = phrases.length;
const CORRECTS_TO_LEVEL_UP = 3;
const TIMER_START = 5;

const state = {
  level: 1,
  corrects: 0,
  usedPhrases: new Set(),
  timer: TIMER_START,
  timerInterval: null,
  gameOver: false,
  currentPhrase: null,
  totalAnswered: 0,
  won: false,
  lastButtonType: null
};

// Simple Sound Engine with WebM + MP3 fallback
const sounds = {
  bleep: createAudioWithFallback('/assets/sounds/bleep.webm', '/assets/sounds/bleep.mp3'),
  blop: createAudioWithFallback('/assets/sounds/blop.webm', '/assets/sounds/blop.mp3'),
  won: createAudioWithFallback('/assets/sounds/won.webm', '/assets/sounds/won.mp3'),
  gameOver: createAudioWithFallback('/assets/sounds/game-over.webm', '/assets/sounds/game-over.mp3'),
};

function createAudioWithFallback(webmPath, mp3Path) {
  const audio = new Audio();
  
  // Try WebM first, fallback to MP3
  audio.addEventListener('error', function() {
    if (audio.src.includes('.webm')) {
      audio.src = mp3Path;
    }
  });
  
  audio.src = webmPath;
  return audio;
}

function getRandomPhrase(level) {
  const available = phrases[level - 1].filter((_, i) => !state.usedPhrases.has(`${level}-${i}`));
  if (available.length === 0) return null;
  const idx = Math.floor(Math.random() * available.length);
  const phraseIdx = phrases[level - 1].findIndex(p => p === available[idx]);
  state.usedPhrases.add(`${level}-${phraseIdx}`);
  return available[idx];
}

function renderHUD() {
  const levelEl = document.getElementById('hud-level');
  const timerEl = document.getElementById('hud-timer');
  if (levelEl) levelEl.textContent = `level: ${state.level}`;
  if (timerEl) timerEl.textContent = `${state.timer}s`;
}

function renderPhrase(phraseObj) {
  state.currentPhrase = phraseObj;
  const probableFirst = Math.random() < 0.5;
  const first = probableFirst ? phraseObj.probable : phraseObj.improbable;
  const second = probableFirst ? phraseObj.improbable : phraseObj.probable;
  const firstIsProbable = probableFirst;

  const firstBtn = document.querySelector('.phrases > button.first');
  const secondBtn = document.querySelector('.phrases > button.second');
  if (firstBtn && secondBtn) {
    const anim1 = -Math.random() * 8;
    const anim2 = -Math.random() * 8;
    firstBtn.innerHTML = `${phraseObj.text} <span class="probable-improbable-word" style="animation-delay: ${anim1}s;">${first}</span>`;
    secondBtn.innerHTML = `${phraseObj.text} <span class="probable-improbable-word" style="animation-delay: ${anim2}s;">${second}</span>`;
    firstBtn.onclick = () => handleButtonClick(firstIsProbable, 'first');
    secondBtn.onclick = () => handleButtonClick(!firstIsProbable, 'second');
    firstBtn.disabled = false;
    secondBtn.disabled = false;
    firstBtn.classList.remove('glass-bg', 'reflect-anim');
    secondBtn.classList.remove('glass-bg', 'reflect-anim');
    
    // Add touch event handlers to prevent border persistence
    addTouchHandlers(firstBtn);
    addTouchHandlers(secondBtn);
    
    scheduleReflection(firstBtn);
    setTimeout(() => scheduleReflection(secondBtn), 500 + Math.random() * 1000);
  }
}

function addTouchHandlers(button) {
  // Remove any existing handlers
  button.removeEventListener('touchstart', button._touchStartHandler);
  button.removeEventListener('touchend', button._touchEndHandler);
  button.removeEventListener('touchcancel', button._touchEndHandler);
  button.removeEventListener('mouseup', button._mouseUpHandler);
  button.removeEventListener('mouseleave', button._mouseLeaveHandler);
  
  // Create handlers
  button._touchStartHandler = () => {
    button.style.borderColor = '#FFD600';
  };
  
  button._touchEndHandler = () => {
    button.style.borderColor = 'transparent';
  };
  
  button._mouseUpHandler = () => {
    button.style.borderColor = 'transparent';
  };
  
  button._mouseLeaveHandler = () => {
    button.style.borderColor = 'transparent';
  };
  
  // Add event listeners
  button.addEventListener('touchstart', button._touchStartHandler, { passive: true });
  button.addEventListener('touchend', button._touchEndHandler, { passive: true });
  button.addEventListener('touchcancel', button._touchEndHandler, { passive: true });
  button.addEventListener('mouseup', button._mouseUpHandler, { passive: true });
  button.addEventListener('mouseleave', button._mouseLeaveHandler, { passive: true });
}

function handleButtonClick(isProbable, buttonType) {
  // Store which button was clicked for sound purposes
  state.lastButtonType = buttonType;
  handleAnswer(isProbable);
}

function handleAnswer(isCorrect) {
  if (state.gameOver) return;
  state.totalAnswered++;
  if (isCorrect) {
    state.corrects++;
    if (state.corrects % CORRECTS_TO_LEVEL_UP === 0) {
      state.level++;
      if (state.level > MAX_LEVEL) {
        state.won = true;
        showEndScreen(true);
        return;
      }
      state.timer = TIMER_START + (state.level - 1);
    } else {
      state.timer = TIMER_START + (state.level - 1);
    }
    // Play button sound only if game continues
    if (state.lastButtonType) {
      playSound(state.lastButtonType === 'first' ? 'bleep' : 'blop');
      state.lastButtonType = null;
    }
    renderHUD();
    nextQuestion();
  } else {
    showEndScreen(false);
  }
}

function nextQuestion() {
  renderHUD();
  const phrase = getRandomPhrase(state.level);
  if (!phrase) {
    state.won = true;
    showEndScreen(true);
    return;
  }
  renderPhrase(phrase);
}

function showEndScreen(won) {
  state.gameOver = true;
  state.won = won;
  clearInterval(state.timerInterval);
  const container = document.querySelector('.phrases');
  container.innerHTML = `<div style="text-align:center; width:100%; padding:2em 0;">
    <div class="end-game-text">${won ? '🎉 You Won!' : '⏰ Game Over!'}</div>
    <button id="restart-btn" class="end-game-button">Play Again</button>
  </div>`;
  playSound(won ? 'won' : 'gameOver');
  
  const restartBtn = document.getElementById('restart-btn');
  restartBtn.onclick = () => {
    state.gameOver = false;
    state.won = false;
    state.level = 1;
    state.corrects = 0;
    state.usedPhrases = new Set();
    state.timer = TIMER_START;
    state.currentPhrase = null;
    state.totalAnswered = 0;
    startGame();
  };
  
  // Add touch handlers to restart button
  addTouchHandlers(restartBtn);
}

document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'restart-btn') {
    startGame();
  }
});

function startTimer() {
  state.timer = TIMER_START + (state.level - 1);
  renderHUD();
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timer--;
    renderHUD();
    if (state.timer <= 0) {
      showEndScreen(false);
    }
  }, 1000);
}

function startGame() {
  state.level = 1;
  state.corrects = 0;
  state.usedPhrases = new Set();
  state.timer = TIMER_START;
  state.gameOver = false;
  state.currentPhrase = null;
  state.totalAnswered = 0;
  state.won = false;
  state.lastButtonType = null;
  const container = document.querySelector('.phrases');
  container.innerHTML = '<button class="phrases first"></button><button class="phrases second"></button>';
  nextQuestion();
  startTimer();
}

document.addEventListener('DOMContentLoaded', startGame);

// Reflection/glass effect helpers
function triggerReflection(btn) {
  btn.classList.add('reflect-anim');
  setTimeout(() => btn.classList.remove('reflect-anim'), 450);
}
function maybeGlass(btn) {
  if (Math.random() < 0.25) {
    btn.classList.add('glass-bg');
  } else {
    btn.classList.remove('glass-bg');
  }
}
function scheduleReflection(btn) {
  const delay = 2000 + Math.random() * 2000;
  setTimeout(() => {
    triggerReflection(btn);
    maybeGlass(btn);
    if (!state.gameOver) scheduleReflection(btn);
  }, delay);
}

function playSound(name) {
  if (sounds[name]) {
    // Reset and play
    sounds[name].currentTime = 0;
    sounds[name].play();
  }
} 