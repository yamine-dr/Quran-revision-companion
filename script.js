/**
 * @typedef Surah
 * @type {object}
 * @property {string} name the surah name
 * @property {number} index the surah number in order of the Mushaf (1-114)
 */

async function fetchAllSurahs() {
  const res = await fetch("https://quranapi.pages.dev/api/surah.json");
  return res.json()
}

function getRandomSurah(surahsArray) {
  const randomIndex = Math.floor(Math.random() * 114); // there are 114 surahs

  const {
    surahName,
    // surahNameTranslation,
    // surahNameArabic,
    // surahNameArabicLong,
    // ...rest
  } = surahsArray[randomIndex];

  return {
    index: randomIndex + 1,
    name: surahName,
    // nameTranslation: surahNameTranslation,
    // nameArabic: surahNameArabic,
    // nameArabicLong: surahNameArabicLong,
    // ...rest // revelationPlace, totalAyah
  };
}

const surahs = await fetchAllSurahs();

// DOM elements
const surahNameSpan = document.getElementById("surah-name");
const answerInput = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");

function resetState() {
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
  
  answerInput.value = "";
  answerInput.style.backgroundColor = "#fff";
}

function handleAnswerSubmit(surahIndex) {
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";

  const isRightAnswer = Number(answerInput.value) === surahIndex;
  answerInput.style.backgroundColor = isRightAnswer ? "green" : "red";
}

function startQuiz() {
  resetState();

  /** @type {Surah} */
  const randomSurah = getRandomSurah(surahs);
  // console.log(`Surah : ${JSON.stringify(randomSurah)}`);
  // console.log(`Surah ${randomSurah.index} : ${randomSurah.name}`);

  // inject surah name in the HTML page
  surahNameSpan.textContent = randomSurah.name;

  // submit-btn event listener get auto-removed after it runs once
  submitBtn.addEventListener("click", () => handleAnswerSubmit(randomSurah.index), { once: true });
}

nextBtn.addEventListener("click", () => {
  startQuiz();
});

startQuiz();