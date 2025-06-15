import { phrases } from './phrases.js';

let level = 1;

function getRandomPhrase(level) {
  const levelPhrases = phrases[level - 1];
  return levelPhrases[Math.floor(Math.random() * levelPhrases.length)];
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
  }
}

document.addEventListener('DOMContentLoaded', () => {
  level = 1;
  const phrase = getRandomPhrase(level);
  renderPhrase(phrase);
}); 