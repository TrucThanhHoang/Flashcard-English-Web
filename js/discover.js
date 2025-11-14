const flashcards = [
  {
    title: 'Basic English Vocabulary',
    level: 'Beginner',
    description:
      'Essential words for everyday communication and basic conversations.',
    link: '../lists/basic/review.html',
    count: 50,
    image: {
      src: '../../images/index2.jpg',
      alt: 'Basic English Vocabulary Flashcards',
    },
  },
  {
    title: 'Animals & Nature',
    level: 'Beginner',
    description:
      'Learn about different animals and natural elements in English.',
    link: '../lists/animals/review.html',
    count: 40,
    image: {
      src: '../../images/index3.jpg',
      alt: 'Animals & Nature Flashcards',
    },
  },
  {
    title: 'Food & Drinks',
    level: 'Intermediate',
    description: 'Vocabulary related to food, drinks, and dining experiences.',
    link: '../lists/food/review.html',
    count: 60,
    image: {
      src: '../../images/index4.jpg',
      alt: 'Food & Drinks Flashcards',
    },
  },
  {
    title: 'Travel & Transportation',
    level: 'Intermediate',
    description:
      'Common terms and phrases used in travel and transportation contexts.',
    link: '../lists/travel/review.html',
    count: 55,
    image: {
      src: '../../images/index5.jpg',
      alt: 'Travel & Transportation Flashcards',
    },
  },
  {
    title: 'Business English',
    level: 'Advanced',
    description:
      'Key vocabulary for professional settings and business communication.',
    link: '../lists/business/review.html',
    count: 70,
    image: {
      src: '../../images/index6.jpg',
      alt: 'Business English Flashcards',
    },
  },
];

const cardsContainer = document.querySelector('.container .cards-container');

flashcards.forEach((flashcard) => {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <img src="${flashcard.image.src}" alt="${
    flashcard.image.alt
  }" class="flashcard-image" />
    <h3 class="flashcard-title">${flashcard.title}</h3>
    <span class="level ${flashcard.level.toLowerCase()}">${
    flashcard.level
  }</span>
    <p class="flashcard-description">${flashcard.description}</p>
    <p class="flashcard-count">${flashcard.count} Cards</p>
    <a href="${flashcard.link}">
      <button>Review</button>
    </a>
  `;

  cardsContainer.appendChild(card);
});
