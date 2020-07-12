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
function validate(target){
  if (target.value === randomWord[target.indexLetter]) {
    target.classList.add("correctAnswer")
    console.log(target);
  } else {
    target.classList.add("incorrectAnswer")
    tries--;
    triesNode.nodeValue = tries;
    console.log(tries)
  }

}
function renderInputBoxes() {

  for (let index = 0; index < randomWord.length; index++) {
    let input = document.createElement("input");
    input.indexLetter = index;
    input.addEventListener("change", (event) => {
      console.log(event.target.indexLetter);
      console.log(event.target.value);
      validate(event.target);

    })
    container.appendChild(input);
  }
}
function createInputBoxes() {
  container = document.getElementById("inputBoxes");
  container.innerHTML = "";
  randomWord = fruits[Math.floor(Math.random() * fruits.length)];
  console.log(randomWord);
  renderInputBoxes();
  return randomWord;
}

let triesNode = document.createTextNode(tries.toString());
document.getElementById("information").appendChild(triesNode)
