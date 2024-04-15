const gamePlayButtonSelector = document.querySelector(".header_game_play_button");
gamePlayButtonSelector.addEventListener('click', ()=> {
    location.href = "puzzle.html";
});

const titleInputSelector = document.querySelector("#title-input");
const descriptionInputSelector = document.querySelector("#description-input");

const wordInputAllSelector = document.querySelectorAll(".word-input-div");
let wordInputArray = [];

// word-submit-button 클릭했을때 input에 입력한 데이터 전부 가져오기
const wordSubmitButton = document.querySelector(".word-submit-button");
wordSubmitButton.addEventListener("click", (event) => {
  for (let i = 0; i < wordInputAllSelector.length; i++) {
    let inputData = wordInputAllSelector[i];
    wordInputArray.push(inputData.value);
    console.log(inputData.value);
  }
  const puzzleTitle = titleInputSelector.value;
  const puzzleDescription = descriptionInputSelector.value;
  console.log("title: " + puzzleTitle);
  console.log("description: " + puzzleDescription);
})












