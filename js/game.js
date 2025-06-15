import { phrases } from './phrases.js';

class Game {
    constructor() {
        this.level = 1;
        this.score = 0;
        this.phrases = [];
        this.currentPhrase = null;
        
        // DOM Elements
        this.leftPhrase = document.querySelector('.phrase.left');
        this.rightPhrase = document.querySelector('.phrase.right');
        
        // Bind event listeners
        this.leftPhrase.addEventListener('click', () => this.makeChoice('left'));
        this.rightPhrase.addEventListener('click', () => this.makeChoice('right'));
        
        // Initialize game
        this.init();
    }
    
    init() {
        // TODO: Load phrases from a data source
        this.loadPhrases();
        this.showNextPhrase();
    }
    
    loadPhrases() {
        // TODO: Implement phrase loading logic
        this.phrases = [];
    }
    
    showNextPhrase() {
        // TODO: Implement phrase display logic
    }
    
    makeChoice(side) {
        // TODO: Implement choice logic
    }
    
    updateScore() {
        // TODO: Implement score update logic
    }
    
    increaseLevel() {
        // TODO: Implement level increase logic
    }
}

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
  const firstIsProbable = probableFirst;

  const container = document.querySelector('.phrase-container');
  container.innerHTML = `
    <button class="phrase first">
      ${phraseObj.text} <span class="probable-improbable-word">${first}</span>
    </button>
    <button class="phrase second">
      ${phraseObj.text} <span class="probable-improbable-word">${second}</span>
    </button>
  `;
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Game();
    const phrase = getRandomPhrase(level);
    renderPhrase(phrase);
}); 