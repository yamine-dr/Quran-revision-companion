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

const surahNumberEl = document.getElementById("surah-number");
surahNumberEl.textContent = randomSurah.index;