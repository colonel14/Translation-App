const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTags = document.querySelectorAll("select");
const translateBtn = document.querySelector(".translate");

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

// Translate Function
function translate() {
  let text = fromText.value;
  let translateFrom = selectTags[0].value;
  let translateTo = selectTags[1].value;
  console.log(text, translateFrom, translateTo);
  const apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      toText.value = data.responseData.translatedText;
    });
}
