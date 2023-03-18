import { loadHeaderFooter, getItemFromUrl } from "./utils.mjs";
import { GetACategory } from "./ExternalSources.mjs";

function productCardTemplate(product) {
  var img = product.strMealThumb;
  return `<li class="product-card">
    <a href="/recipe/index.html?id=${product.idMeal}">
    <img
      src="${img}"
      alt="Image of ${product.strMeal} "
    />
    <h2 class="card__name">${product.strMeal}</h2></a>
  </li>`;
}

function BuildPage(data) {
  //const displayItems = [];
  //for (var item in data) {
  //  displayItems.Push(productCardTemplate(item));
  //}
  const displayItems = data.map((x) => productCardTemplate(x));
  //var displayItems = renderListWithTemplate(productCardTemplate, categories);
  document
    .getElementById("list-items")
    .insertAdjacentHTML("afterbegin", displayItems.join(""));
}

async function Load() {
  loadHeaderFooter();
  var value = getItemFromUrl("type");
  var data = await GetACategory(value);
  BuildPage(data.meals);
}

Load();
