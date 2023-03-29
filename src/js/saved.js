import {
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";

function productCardTemplate(product) {
  var temp = JSON.parse(product);
  var item = temp.meals[0];
  var img = item.strMealThumb;
  return `<li class="product-card">
    <a href="/recipe/index.html?id=${item.idMeal}">
    <img
      src="${img}"
      alt="Image of ${item.strMeal} "
    />
    <h2 class="card__name">${item.strMeal}</h2></a>
    <button class="remove-item" data-id="${item.idMeal}">Remove</button>
  </li>`;
}

async function removeItemFromCart(id) {
  // Get Items from local storage
  let dist = [getLocalStorage("saved")];

  // Loop through items and remove items
  // that match passed id
  for (let i = 0; i < dist[0].length; i++) {
    let arrEle = JSON.parse(dist[0][i]);

    // Check if array element matches
    //If matches remove element.
    if (arrEle.meals[0].idMeal == id) {
      dist[0].splice(i, 1);
      i--;
    }
  }

  // Update local storage and reload cart
  setLocalStorage("saved", dist[0]);
  //var data = getLocalStorage("saved");
  document.getElementById("list-items").innerHTML = "";
  await BuildPage(dist[0]);
}

async function removeItemHandler(e) {
  let id = e.target.dataset.id;
  await removeItemFromCart(id);
}

async function BuildPage(data) {
  const displayItems = data.map((x) => productCardTemplate(x));
  //var displayItems = renderListWithTemplate(productCardTemplate, categories);
  document
    .getElementById("list-items")
    .insertAdjacentHTML("afterbegin", displayItems.join(""));

  var items = document.getElementsByClassName("remove-item");

  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", removeItemHandler);
  }
}

async function Load() {
  loadHeaderFooter();
  var data = getLocalStorage("saved");
  await BuildPage(data);
}

Load();
