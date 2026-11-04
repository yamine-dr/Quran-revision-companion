async function fetchAllSurahs() {
  const res = await fetch("https://quranapi.pages.dev/api/surah.json");
  return res.json()
};

function getRandomSurah(surahsArray) {
  const randomIndex = Math.floor(Math.random() * surahsArray.length);

  const {
    surahName,
    surahNameTranslation,
    surahNameArabic,
    surahNameArabicLong,
    ...rest
  } = surahsArray[randomIndex];

  return {
    index: randomIndex + 1,
    name: surahName,
    nameTranslation: surahNameTranslation,
    nameArabic: surahNameArabic,
    nameArabicLong: surahNameArabicLong,
    ...rest // revelationPlace, totalAyah
  };
}

const surahs = await fetchAllSurahs();
const randomSurah = getRandomSurah(surahs);
// console.log(`Surah : ${JSON.stringify(randomSurah)}`);
console.log(`Surah ${randomSurah.index} : ${randomSurah.name}`);

// inject randomSurah name in the HTML page
const surahNameSpan = document.getElementById("surah-name");
surahNameSpan.textContent = randomSurah.name;

const surahNameQuizSubmitBtn = document.getElementById("surah-number-quiz-submit");
const surahNameQuizInput = document.getElementById("surah-number-quiz-input");
const answerFeedbackEl = document.getElementById("answer-feedback");

// validate user answer
surahNameQuizSubmitBtn.addEventListener("click", (event) => {
  const userAnswer = Number(surahNameQuizInput.value);
  const isRightAnswer = userAnswer === randomSurah.index;
  answerFeedbackEl.classList.add(isRightAnswer ? "success" : "failed");
  answerFeedbackEl.textContent = isRightAnswer.toString();
  console.log(userAnswer);
  event.preventDefault();
});