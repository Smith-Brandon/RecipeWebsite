import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import { GetCategories } from "./ExternalSources.mjs";

function productCardTemplate(product) {
  var img = "./images/" + product.strCategory + ".png";
  var name = product["strCategory"];
  return `<li class="product-card">
    <a href="/categories/index.html?type=${name}">
    <img
      src="${img}"
      alt="Image of ${name} "
    />
    <h2 class="card__name">${name}</h2></a>
  </li>`;
}

function BuildPage(categories) {
  const displayItems = categories.map((x) => productCardTemplate(x));
  //var displayItems = renderListWithTemplate(productCardTemplate, categories);
  document
    .getElementById("list-items")
    .insertAdjacentHTML("afterbegin", displayItems.join(""));
}

async function Load() {
  loadHeaderFooter();
  await GetCategories();
  var rawdata = getLocalStorage("categories");
  var data = [JSON.parse(rawdata)];
  var categories = data[0].categories;
  BuildPage(categories);
}

Load();
