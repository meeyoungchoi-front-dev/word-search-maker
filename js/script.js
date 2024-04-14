// DB반영전 테스트를 위한 mock data
const userNickNames = ["물결의황색위습", "소리없는검", "라일락", "fireballdead"];
const userRecords = [30, 25, 25, 31];

const words = ["LEONARD", "HOWARD", "PENNY", "AMY", "THEORY", "RAJESH", "SHELDON", "SCIENCE", "PHYSICS", "COMICBOOK"];
const puzzleContainer = document.getElementById("puzzle-container");
let wordListSelector = document.querySelector(".word_list");
let timerSelector = document.querySelector(".timer");
let popupSelector = document.querySelector(".puzzle_popup");
let startButtonSelector  = document.querySelector(".game_start");
let exitButtonSelector = document.querySelector(".game_exit");
let userRankingSelector = document.querySelector(".user_ranking");
let userNickNameSelector = document.querySelector("#user_nickname");
let playingUserNickName = "";
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
    playingUserNickName = userNickNameSelector.innerHTML;
    popupSelector.style.backgroundColor = "white";
    document.body.style.backgroundColor = "gray";
    setUserRanking(userNickNames, userRecords);
}

function gameStart() {
    placeWordList(words);
    createPuzzleGrid(words)
    setInterval(() => {
        seconds = seconds+ 1;
        timerSelector.textContent = String(seconds).padStart(2,"0");
    }, 1000);
}

function placeWordList(words) {
    for (let i = 0; i < words.length; i++) {
        const newDivElement = document.createElement('div');
        newDivElement.innerHTML = words[i];
        newDivElement.className = "words-array";
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

function setUserRanking() {
    let rank = 1;
    for (let i = 0; i < userNickNames.length; i++) {
        const divElement = document.createElement('div');
        divElement.innerHTML = rank + " " + userNickNames[i] + " " + userRecords[i] + "초";
        userRankingSelector.appendChild(divElement);
        rank++;
    }
}

let userDragData = "";
let puzzleLetterSelectors = document.querySelectorAll(".puzzle-letter");

puzzleLetterSelectors.forEach(draggable => {
    draggable.addEventListener('dragenter', (event) => {
        console.log("drag start: " + event.target.innerHTML);
        event.target.classList.add(event.target.innerHTML);
        event.target.style.backgroundColor = "pink";
    })
});

puzzleLetterSelectors.forEach(draggable => {
    draggable.addEventListener('dragleave', (event) => {
        console.log("drag leave: " + event.target.innerHTML);
        event.target.classList.add(event.target.innerHTML);
        event.target.style.backgroundColor = "pink";
        userDragData += event.target.innerHTML;
        console.log("userDragData: " + userDragData);
        checkPuzzleAnswer(userDragData);  
    })
});

function checkPuzzleAnswer(userDragData) {
    let answer = "";
    let answerCount = 0;
    // puzzle-letter className div를 드래그 하는 이벤트를 발생시킨다
    // 이벤트가 발생된 div의 색을 변경한다
    // 이벤트가 종료되는 div까지 innerText를 변수에 저장한다 => 결과값
    // 결과값 데이터와 words 배열에 들어있는 값이 같으면 정답이라고 표시해준다
    // 결과값 데이터와 words 배열에 들어있는 값이 다르면 오답이라고 표시해준다

    for (let i = 0; i < words.length; i++) {
        if (userDragData == words[i]) {
            alert("정답");
            answer = words[i];
            break;
        } else {
            alert("오답");
            break;
        }
    }

    const wordsArrays = document.querySelectorAll(".words-array");
    for (let i = 0; i < wordsArrays.length; i++) {
        if (answer == wordsArrays[i].innerHTML) {
            wordsArrays[i].innerHTML.style.backgroundColor = "gray";
            answerCount+=1;
        }
    }

    if (answerCount == wordsArrays.lenght) {
        alert(playingUserNickName + "님 퍼즐을 다 풀었습니다\n " + "퍼즐 푸는데 걸린시간: " + seconds);
        userNickNames.push(playingUserNickName);
        userRecords.push(seconds);
    }
}

popupSet();