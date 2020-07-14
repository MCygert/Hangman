let fruits = null;
let randomWord;
let container = null;
let tries = 9;


function getData() {

  return fetch("https://api.predic8.de:443/shop/products/")
        .then((response) => response.json())
        .then((json) => json.products)
        .catch(() => console.log("Something went wrong"));
}

getData().then((json) => (fruits = json.map((name) => name.name))).finally( () => createInputBoxes());

function updateTries() {
  tries--;
  triesNode.nodeValue = tries;
}

function validate(target){
  if (target.value === randomWord[target.indexLetter]) {
    target.className = '';
    target.classList.add("correctAnswer");
    target.disabled = true;
    console.log(target);
  } else if (randomWord.includes(target.value)) {
    target.className = '';
    target.classList.add("badPositionAnswer");
    updateTries();
  } else {
    target.className = '';
    target.classList.add("incorrectAnswer");
    updateTries();
    console.log(tries);
  }

}

function checkIfCorrectLetter(target) {
  const alphabeticLetters = /^[A-Za-z]+$/;
  if (!target.value.match(alphabeticLetters)) {
    target.value = "";
  }
}

function renderInputBoxes() {

  for (let index = 0; index < randomWord.length; index++) {
    let input = document.createElement("input");
    input.indexLetter = index;
    input.addEventListener("change", (event) => {
      console.log(event.target.indexLetter);
      console.log(event.target.value);
      checkIfCorrectLetter(event.target)
      validate(event.target);

    })
    container.appendChild(input);
  }
}
function createInputBoxes() {
  tries = 9;
  triesNode.nodeValue = tries.toString();
  container = document.getElementById("inputBoxes");
  container.innerHTML = "";
  randomWord = fruits[Math.floor(Math.random() * fruits.length)];
  console.log(randomWord);
  renderInputBoxes();
  return randomWord;
}

let triesNode = document.createTextNode(tries.toString());
document.getElementById("information").appendChild(triesNode)
