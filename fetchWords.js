let fruits = null;
let randomWord;
let inputContainer = null;
let spanContainer = null;
let tries = 9;
let hintNumber = 3;

function getData() {

    return fetch("https://api.predic8.de:443/shop/products/")
        .then((response) => response.json())
        .then((json) => json.products)
        .catch(() => console.log("Something went wrong"));
}

getData().then((json) => (fruits = json.map((name) => name.name))).finally(() => {
    createInputBoxes();
    createSpanPlaces;
});

function updateTriesCount() {
    tries--;
    triesNode.nodeValue = tries;
}

function validate(target) {
    if (target.value === randomWord[target.indexLetter]) {
        target.className = '';
        target.classList.add("correctAnswer");
        target.disabled = true;
        console.log(target);
    } else if (randomWord.includes(target.value)) {
        target.className = '';
        target.classList.add("badPositionAnswer");
        updateTriesCount();
    } else {
        target.className = '';
        target.classList.add("incorrectAnswer");
        updateTriesCount();
        console.log(tries);
    }

}

function checkIfAlphabetLetter(target) {
    const alphabeticLetters = /^[A-Za-z]+$/;
    if (!target.value.match(alphabeticLetters)) {
        target.value = "";
    }
}

function addCorrectLetterToSpan(target) {
    if (target.className === 'correctAnswer') {
        let spanBox = document.getElementById("guessedLetters").children;
        for (let spanBoxElement of spanBox) {
            console.log(spanBoxElement);
            if (spanBoxElement.indexLetter === target.indexLetter) {
                console.log(spanBoxElement.indexLetter)
                spanBoxElement.innerText = target.value;
            }
        }
    }
}

function renderInputBoxes() {

    for (let index = 0; index < randomWord.length; index++) {
        let input = document.createElement("input");
        input.indexLetter = index;
        input.addEventListener("change", (event) => {
            checkIfAlphabetLetter(event.target)
            validate(event.target);
            addCorrectLetterToSpan(event.target);
        })
        inputContainer.appendChild(input);
    }
}

function getHint() {
    let inputBoxes = document.getElementById('inputBoxes').children;
    if (hintNumber <= 0) {
        alert("You are out of hints")
    } else {
        for (let i = 0; i < inputBoxes.length; i++) {

            if (inputBoxes[i].className === 'incorrectAnswer' ||
                inputBoxes[i].className === 'badPositionAnswer' ||
                inputBoxes[i].className === '') {
                inputBoxes[i].value = randomWord[i];
                inputBoxes[i].className = 'correctAnswer'
                hintNumber--;
                hintsNode.nodeValue = hintNumber.toString();
                return null;
            }
        }
    }
}

function createInputBoxes() {
    hintNumber = 3;
    tries = 9;
    triesNode.nodeValue = tries.toString();
    inputContainer = document.getElementById("inputBoxes");
    inputContainer.innerHTML = "";
    randomWord = fruits[Math.floor(Math.random() * fruits.length)];
    console.log(randomWord);
    renderInputBoxes();
    createSpanPlaces()
}

function createSpanPlaces() {
    spanContainer = document.getElementById("guessedLetters")
    spanContainer.innerHTML = "";
    for (let i = 0; i < randomWord.length; i++) {
        let input = document.createElement("span")
        input.indexLetter = i;
        spanContainer.appendChild(input)
    }
}

let triesNode = document.createTextNode(tries.toString());
let hintsNode = document.createTextNode(hintNumber.toString());
document.getElementById("information").appendChild(triesNode)
document.getElementById("information").appendChild(hintsNode)
