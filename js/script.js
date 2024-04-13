const words = ["LEONARD", "HOWARD", "PENNY", "AMY", "THEORY", "RAJESH", "SHELDON", "SCIENCE", "PHYSICS", "COMICBOOK"];
const puzzleContainer = document.getElementById("puzzle-container");
let wordListSelector = document.querySelector(".word_list");
let timerSelector = document.querySelector(".timer");
let popupSelector = document.querySelector(".puzzle_popup");
let startButtonSelector  = document.querySelector(".game_start");
let exitButtonSelector = document.querySelector(".game_exit");
let seconds = 1;

exitButtonSelector.addEventListener('click', ()=> {
    location.href = "main.html";
});

startButtonSelector.addEventListener('click', ()=> {
    popupSelector.style.display = "none";
    document.body.style.backgroundColor = "white";
    gameStart();
});

function popupSet() {
    popupSelector.style.backgroundColor = "white";
    document.body.style.backgroundColor = "gray";

}

function gameStart() {
    setInterval(() => {
        seconds = seconds+ 1;
        timerSelector.textContent = String(seconds).padStart(2,"0");
    }, 1000);                                                                                                                                                                                                  
}

function placeWordList(words) {
    for (let i = 0; i < words.length; i++) {
        const newDivElement = document.createElement('div');
        newDivElement.innerHTML = words[i];
        wordListSelector.appendChild(newDivElement);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createPuzzleGrid(words) {
    // 단어 배열을 한 번 랜덤하게 섞는다
    shuffle(words);
    console.log(words);

    // 방향을 저장할 배열을 만듭니다.
    const directions = [];
    // 단어 배열의 길이만큼 반복하여 방향을 랜덤하게 선택하고 directions 배열에 저장한다
    for (let i = 0; i < words.length; i++) {
        directions.push(0); // 0은 수평
    }
    
    // words 배열의 길이만큼 반복하여 단어를 그리드에 배치한다
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const direction = directions[i]; // 해당 단어의 방향을 가져온다

        if (direction === 0) { // 수평 방향일 때
            // 그리드에 단어를 배치한다
            placeWordHorizontally(word);
        }
    }
}

// 수평 방향으로 단어를 배치하는 함수
function placeWordHorizontally(word) {
    for (let row = 0; row < 14; row++) {
        const letterElement = document.createElement("div");
        letterElement.classList.add("puzzle-letter");
        // 현재 단어의 글자를 각각의 그리드 div에 할당한다
        if (row < word.length) { // 단어의 길이 내에 있는 경우
            letterElement.textContent = word[row % word.length];
        
        } else { // 단어의 길이를 넘어가는 경우
            letterElement.textContent = getRandomAlphabet(); // 랜덤 알파벳 할당
        }
        puzzleContainer.appendChild(letterElement);
    }
}

// 랜덤 알파벳을 반환하는 함수
function getRandomAlphabet() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

popupSet();
createPuzzleGrid(words);
placeWordList(words);
