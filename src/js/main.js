import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";

function productCardTemplate(product) {
  var img = "./images/" + product.strCategory + ".png";
  return `<li class="product-card">
    <a href="/product_pages/index.html?id=${product.Id}">
    <img
      src="${img}"
      alt="Image of ${product.strCategory} "
    />
    <h3 class="card__brand">${product.strCategory}</h3>
    <h2 class="card__name">${product.strCategory}</h2></a>
  </li>`;
}

function BuildPage(categories) {
  const displayItems = categories.map((x) => productCardTemplate(x));
  //var displayItems = renderListWithTemplate(productCardTemplate, categories);
  document
    .getElementById("list-items")
    .insertAdjacentHTML("afterbegin", displayItems.join(""));
}

function Load() {
  loadHeaderFooter();
  var rawdata = getLocalStorage("categories");
  var data = [JSON.parse(rawdata)];
  var categories = data[0].categories;
  BuildPage(categories);
}

/* function StartSearch(){
    var x = 0;
} */

Load();
/* document.getElementById("#search-btn").addEventListener("click", (e) => {
    e.preventDefault();
    var searchText = document.getElementById("#search-box").value;
    var query = "../search/index.html?Q=" + searchText;
    window.location.href = query;
  }); */
