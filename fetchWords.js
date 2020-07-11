let fruits = null;
let randomWord;
let container = null;


function getData() {

  return fetch("https://api.predic8.de:443/shop/products/")
        .then((response) => response.json())
        .then((json) => json.products)
        .catch(() => console.log("Something went wrong"));
}

getData().then((json) => (fruits = json.map((name) => name.name))).finally( () => createInputBoxes());
function validate(target){
  if (target.value === randomWord[target.indexLetter]) {
    console.log("it's correcte")
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
