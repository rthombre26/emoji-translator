// Emoji Mapping Dictionary
const emojiMap = {
  love: "❤️",
  pizza: "🍕",
  movies: "🎬",
  night: "🌙",
  party: "🎉",
  fun: "😄",
  happy: "😊",
  sad: "😢",
  cool: "😎",
  food: "🍔",
  sleep: "😴",
  sun: "☀️",
  moon: "🌕",
  star: "⭐",
  cat: "🐱",
  dog: "🐶",
  music: "🎵",
  book: "📚",
  coffee: "☕",
  rain: "🌧️",
  fire: "🔥",
  heart: "❤️",
  laugh: "😂",
  cry: "😭",
  smile: "😊",
  angry: "😡",
  // Add more mappings as needed
};

// Tone Adjustments
const toneAdjustments = {
  normal: (emoji) => emoji,
  genz: (emoji) => `${emoji}✨🤪`,
  shakespearean: (emoji) => `📜${emoji}📜`,
  poetic: (emoji) => `🎭${emoji}🎭`,
};

// Translate Function
function translateToEmoji(text, tone, density) {
  const words = text.toLowerCase().split(" ");
  let translatedText = words
    .map((word) => {
      const emoji = emojiMap[word] || word;
      return toneAdjustments[tone](emoji);
    })
    .join(" ");

  // Adjust density
  if (density === "low") {
    translatedText = translatedText.replace(/([\u{1F600}-\u{1F64F}])/gu, "");
  } else if (density === "medium") {
    translatedText = translatedText.replace(/([\u{1F600}-\u{1F64F}]){2,}/gu, "$1");
  }

  return translatedText;
}

// DOM Elements
const inputText = document.getElementById("input-text");
const toneSelect = document.getElementById("tone");
const densitySelect = document.getElementById("density");
const translateBtn = document.getElementById("translate-btn");
const outputText = document.getElementById("output-text");
const copyBtn = document.getElementById("copy-btn");

// Event Listeners
translateBtn.addEventListener("click", () => {
  const text = inputText.value;
  const tone = toneSelect.value;
  const density = densitySelect.value;
  const translatedText = translateToEmoji(text, tone, density);
  outputText.textContent = translatedText;
});

copyBtn.addEventListener("click", async () => {
  const textToCopy = outputText.textContent;

  if (!textToCopy) {
    alert("Nothing to copy! Translate some text first.");
    return;
  }

  try {
    await navigator.clipboard.writeText(textToCopy);
    alert("Copied to clipboard! 🎉");
  } catch (err) {
    console.error("Failed to copy text: ", err);
    alert("Failed to copy text. Please try again.");
  }
});