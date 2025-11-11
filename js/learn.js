const injectFlashcards = (setName) => {
  fetch(`../../../js/word-list/${setName}.json`)
    .then((response) => response.json())
    .then((words) => {
      const flashcardContainer = document.querySelector(
        '.container .flashcard-list'
      );

      words.forEach((word) => {
        const flashcard = document.createElement('div');
        flashcard.className = 'flashcard-card';
        flashcard.innerHTML = `
          <div class="flashcard-front">
              <h2 style="font-size: xx-large">${word.word}</h2>
              <br />
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
                  ${word.example
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
        flashcardContainer.appendChild(flashcard);
      });
    });
};
