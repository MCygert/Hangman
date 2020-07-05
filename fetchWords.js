let fruits = fetch("https://api.predic8.de:443/shop/products/").then(
  (data) => data.json
);
fruits.then((items) => console.log(items));
