const injectWordList = (setName) => {
  fetch(`../../../js/word-list/${setName}.json`)
    .then((response) => response.json())
    .then((words) => {
      const wordListContainer = document.querySelector('.container .word-list');
      const wordListCount = document.getElementById('word-list-count');
      wordListCount.textContent = wordListCount.textContent.replace(
        '{{count}}',
        words.length
      );

      words.forEach((word) => {
        const wordCard = document.createElement('div');
        wordCard.className = 'word-card';
        wordCard.innerHTML = `
          <h2 class="word-title">
            ${word.word}
            <span>(${word.type})</span>
            <span>/${word.pronunciation}/</span>
          </h2>
          <h4>Định nghĩa:</h4>
          <p class="word-definition">${word.definition}</p>
          
          <h4>Ví dụ:</h4>
          <ul class="word-examples">
            ${word.example.map((example) => `<li>${example}</li>`).join('')}
          </ul>
      `;
        wordListContainer.appendChild(wordCard);
      });
    });
};
