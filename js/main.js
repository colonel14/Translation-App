const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTags = document.querySelectorAll("select");
const translateBtn = document.querySelector(".translate");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".row i");

selectTags.forEach((tag, id) => {
  tag.addEventListener("change", () => {
    translate();
  });
  for (const country_code in countries) {
    let selected;

    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "ar-SA") {
      selected = "selected";
    }
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

translateBtn.addEventListener("click", () => {
  translate();
});
exchange.addEventListener("click", () => {
  let tempText = fromText.value;
  let tempLang = selectTags[0].value;
  fromText.value = toText.value;
  selectTags[0].value = selectTags[1].value;
  toText.value = tempText;
  selectTags[1].value = tempLang;
});

// Translate Function
function translate() {
  let text = fromText.value;
  let translateFrom = selectTags[0].value;
  let translateTo = selectTags[1].value;
  const apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
    });
}

// Copy & Speech Icons

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "copyFrom") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (target.id == "volumeFrom") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTags[0].value; // setting utterance language to fromSelect tag value
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTags[1].value; // setting utterance language to toSelect tag value
      }
      speechSynthesis.speak(utterance); // speack the passed utterance
    }
  });
});
