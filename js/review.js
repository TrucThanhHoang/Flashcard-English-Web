const LEARNING_WORD_LIST_PREFIX = 'learningWordList_';
const LEARNING_WORD_INDEX_PREFIX = 'learningWordIndex_';

const injectWordList = (setName) => {
  const learningWordList =
    JSON.parse(localStorage.getItem(LEARNING_WORD_LIST_PREFIX + setName)) || [];

  const clearBtn = document.getElementById('clear-progress-btn');
  clearBtn.onclick = () => {
    localStorage.removeItem(LEARNING_WORD_LIST_PREFIX + setName);
    localStorage.removeItem(LEARNING_WORD_INDEX_PREFIX + setName);
    injectWordList(setName);
  };

  if (!learningWordList || learningWordList.length === 0) {
    fetch(`../../../js/word-list/${setName}.json`)
      .then((response) => response.json())
      .then((words) => {
        displayWordList(words);
      });
    return;
  }

  displayWordList(
    learningWordList.sort((a, b) => {
      const difficultyOrder = { known: 0, easy: 1, medium: 2, hard: 3 };
      return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
    })
  );
};

const displayWordList = (wordList) => {
  const wordListContainer = document.querySelector('.container .word-list');
  const wordListCount = document.getElementById('word-list-count');
  wordListCount.textContent = wordListCount.textContent.replace(
    '{{count}}',
    wordList.length
  );

  wordListContainer.innerHTML = '';
  wordList.forEach((word) => {
    const wordCard = document.createElement('div');
    wordCard.className = 'word-card';
    wordCard.innerHTML = `
          <div class="word-card-header">
            <h2 class="word-title">
            ${word.word}
            <span>(${word.type})</span>
            <span>/${word.pronunciation}/</span>
            <button class="play-audio-button" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
            </button>
            </h2>

            <span class="difficulty-badge ${word.difficulty?.toLowerCase()}">${
      word.difficulty || ''
    }</span>
          </div>

          <audio class="word-audio" hidden src="${word.audio}" ></audio>

          <h4>Định nghĩa:</h4>
          <p class="word-definition">${word.definition}</p>
          
          <h4>Ví dụ:</h4>
          <ul class="word-examples">
            ${word.examples.map((example) => `<li>${example}</li>`).join('')}
          </ul>
      `;

    wordCard
      .querySelector('.play-audio-button')
      .addEventListener('click', () => {
        const audioElement = wordCard.querySelector('audio.word-audio');
        audioElement.play();
      });
    wordListContainer.appendChild(wordCard);
  });
};
