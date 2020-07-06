function getData() {
  return fetch("https://api.predic8.de:443/shop/products/")
    .then((response) => response.json())
    .then((json) => json.products)
    .catch(() => console.log("Something went wrong"));
}

let fruits = null;
getData().then((json) => (fruits = console.log(json.map((name) => name.name))));
// fruits = fruits.map((jsonReponse) => jsonReponse.fruits);
console.log(fruits);
