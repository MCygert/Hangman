function getData() {
  return fetch("https://api.predic8.de:443/shop/products/")
    .then((response) => response.json())
    .then((json) => json.products)
    .catch(() => console.log("Something went wrong"));
}

let fruits = null;
getData().then((json) => (fruits = json.map((name) => name.name)));

function createInputBoxes() {
  let container = document.getElementById("inputBoxes");
  container.innerHTML = "";
  let randomWord = fruits[Math.floor(Math.random() * fruits.length)];
  console.log(randomWord);

  for (let index = 0; index < randomWord.length; index++) {
    let input = document.createElement("input");
    container.appendChild(input);
  }
}
