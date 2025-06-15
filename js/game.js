import { phrases } from './phrases.js';

let level = 1;

function getRandomPhrase(level) {
  const levelPhrases = phrases[level - 1];
  return levelPhrases[Math.floor(Math.random() * levelPhrases.length)];
}

function triggerReflection(btn) {
  btn.classList.add('reflect-anim');
  setTimeout(() => btn.classList.remove('reflect-anim'), 450);
}

function maybeGlass(btn) {
  // 1 in 4 chance to look like glass
  if (Math.random() < 0.25) {
    btn.classList.add('glass-bg');
  } else {
    btn.classList.remove('glass-bg');
  }
}

function scheduleReflection(btn) {
  const delay = 2000 + Math.random() * 2000; // 2-4s
  setTimeout(() => {
    triggerReflection(btn);
    maybeGlass(btn);
    scheduleReflection(btn);
  }, delay);
}

function renderPhrase(phraseObj) {
  // Randomize left/right placement
  const probableFirst = Math.random() < 0.5;
  const first = probableFirst ? phraseObj.probable : phraseObj.improbable;
  const second = probableFirst ? phraseObj.improbable : phraseObj.probable;

  const firstBtn = document.querySelector('.phrase.first');
  const secondBtn = document.querySelector('.phrase.second');
  if (firstBtn && secondBtn) {
    const anim1 = -Math.random() * 8;
    const anim2 = -Math.random() * 8;
    firstBtn.innerHTML = `${phraseObj.text} <span class="probable-improbable-word" style="animation-delay: ${anim1}s;">${first}</span>`;
    secondBtn.innerHTML = `${phraseObj.text} <span class="probable-improbable-word" style="animation-delay: ${anim2}s;">${second}</span>`;
    // Remove glass and reflection classes
    firstBtn.classList.remove('glass-bg', 'reflect-anim');
    secondBtn.classList.remove('glass-bg', 'reflect-anim');
    // Start reflection/glass cycles
    scheduleReflection(firstBtn);
    setTimeout(() => scheduleReflection(secondBtn), 500 + Math.random() * 1000); // offset
  }
}

document.addEventListener('DOMContentLoaded', () => {
  level = 1;
  const phrase = getRandomPhrase(level);
  renderPhrase(phrase);
}); 