const LEARNING_WORD_LIST_PREFIX = 'learningWordList_';
const LEARNING_WORD_INDEX_PREFIX = 'learningWordIndex_';

const injectFlashcards = (setName) => {
  // load learning data from local storage
  const learningWordList =
    JSON.parse(localStorage.getItem(LEARNING_WORD_LIST_PREFIX + setName)) || [];

  const clearBtn = document.getElementById('clear-progress-btn');
  clearBtn.onclick = () => {
    localStorage.removeItem(LEARNING_WORD_LIST_PREFIX + setName);
    localStorage.removeItem(LEARNING_WORD_INDEX_PREFIX + setName);
    injectFlashcards(setName);
  };

  if (!learningWordList || learningWordList.length === 0) {
    fetch(`../../../js/word-list/${setName}.json`)
      .then((response) => response.json())
      .then((words) => {
        setupFlashcard(setName, words, 0);
        localStorage.setItem(
          LEARNING_WORD_LIST_PREFIX + setName,
          JSON.stringify(words)
        );
        localStorage.setItem(LEARNING_WORD_INDEX_PREFIX + setName, '0');
      });

    return;
  }

  const learningWordIndex =
    +localStorage.getItem(LEARNING_WORD_INDEX_PREFIX + setName) || 0;
  setupFlashcard(setName, learningWordList, learningWordIndex);
};

const setupFlashcard = (setName, wordList, wordIndex) => {
  const word = wordList[wordIndex];
  const flashcardContainer = document.querySelector(
    '.container .flashcard-list'
  );

  const flashcard = document.createElement('div');
  flashcard.className = 'flashcard-card';
  flashcard.innerHTML = `
          <div class="flashcard-front">
              <h2 style="font-size: xx-large">${word.word}</h2>
              
              <button class="play-audio-button" onclick="event.stopPropagation()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
              </button>
              
              <audio class="word-audio" hidden src="${word.audio}" ></audio>

              <p style="font-size: large">
                <b>(${word.type}) /${word.pronunciation}/</b>
              </p>
            </div>

            <div class="flashcard-back">
              <div>
                <h4>Định nghĩa:</h4>
                <p class="word-definition">${word.definition}</p>

                <h4>Ví dụ:</h4>
                <ul class="word-examples">
                  ${word.examples
                    .map(
                      (example) => `
                  <li>${example}</li>
                  `
                    )
                    .join('')}
                </ul>
              </div>

              <div class="flashcard-image">
                <img src="../../../images/index1.jpg" alt="hi" />
              </div>
            </div>
      `;
  flashcard.onclick = () => {
    flashcard.classList.toggle('flipped');
  };
  flashcard
    .querySelector('.play-audio-button')
    .addEventListener('click', () => {
      const audioElement = flashcard.querySelector('audio.word-audio');
      audioElement.play();
    });
  flashcardContainer.replaceChildren(flashcard);

  const easyBtn = document.getElementById('easy-btn');
  const mediumBtn = document.getElementById('medium-btn');
  const hardBtn = document.getElementById('hard-btn');
  const knownBtn = document.getElementById('known-btn');

  easyBtn.onclick = () => handleAnswer(setName, wordList, wordIndex, 'easy');
  mediumBtn.onclick = () =>
    handleAnswer(setName, wordList, wordIndex, 'medium');
  hardBtn.onclick = () => handleAnswer(setName, wordList, wordIndex, 'hard');
  knownBtn.onclick = () => handleAnswer(setName, wordList, wordIndex, 'known');
};

const handleAnswer = (setName, wordList, wordIndex, answer) => {
  const newWordList = [...wordList];
  newWordList[wordIndex] = { ...newWordList[wordIndex], difficulty: answer };

  if (answer === 'known') {
    newWordList.splice(wordIndex, 1);
  } else {
    // For simplicity, we won't implement spaced repetition logic here.
    // In a real application, you would adjust the word's review interval based on the answer.
  }

  let nextIndex =
    (++wordIndex - (answer === 'known' ? 1 : 0)) % newWordList.length;

  localStorage.setItem(
    LEARNING_WORD_LIST_PREFIX + setName,
    JSON.stringify(newWordList)
  );
  localStorage.setItem(
    LEARNING_WORD_INDEX_PREFIX + setName,
    nextIndex.toString()
  );

  injectFlashcards(setName);
};
