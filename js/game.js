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
  won: false
};

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
    firstBtn.onclick = () => handleAnswer(firstIsProbable);
    secondBtn.onclick = () => handleAnswer(!firstIsProbable);
    firstBtn.disabled = false;
    secondBtn.disabled = false;
    firstBtn.classList.remove('glass-bg', 'reflect-anim');
    secondBtn.classList.remove('glass-bg', 'reflect-anim');
    scheduleReflection(firstBtn);
    setTimeout(() => scheduleReflection(secondBtn), 500 + Math.random() * 1000);
  }
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
  document.getElementById('restart-btn').onclick = () => {
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