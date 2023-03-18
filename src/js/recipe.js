import { loadHeaderFooter, getItemFromUrl } from "./utils.mjs";
import { GetRecipe } from "./ExternalSources.mjs";

function VerifyIngredient(ingredient, measurement) {
  if (ingredient != "") {
    return `<li>${ingredient} - ${measurement}</li>`;
  }
  return "";
}

function productCardTemplate(product) {
  var img = product.strMealThumb;
  var name = product.strMeal;
  var instruction = product.strInstructions;
  var list = "";
  list += VerifyIngredient(product.strIngredient1, product.strMeasure1);
  list += VerifyIngredient(product.strIngredient2, product.strMeasure2);
  list += VerifyIngredient(product.strIngredient3, product.strMeasure3);
  list += VerifyIngredient(product.strIngredient4, product.strMeasure4);
  list += VerifyIngredient(product.strIngredient5, product.strMeasure5);
  list += VerifyIngredient(product.strIngredient6, product.strMeasure6);
  list += VerifyIngredient(product.strIngredient7, product.strMeasure7);
  list += VerifyIngredient(product.strIngredient8, product.strMeasure8);
  list += VerifyIngredient(product.strIngredient9, product.strMeasure9);
  list += VerifyIngredient(product.strIngredient10, product.strMeasure10);
  list += VerifyIngredient(product.strIngredient11, product.strMeasure11);
  list += VerifyIngredient(product.strIngredient12, product.strMeasure12);
  list += VerifyIngredient(product.strIngredient13, product.strMeasure13);
  list += VerifyIngredient(product.strIngredient14, product.strMeasure14);
  list += VerifyIngredient(product.strIngredient15, product.strMeasure15);
  list += VerifyIngredient(product.strIngredient16, product.strMeasure16);
  list += VerifyIngredient(product.strIngredient17, product.strMeasure17);
  list += VerifyIngredient(product.strIngredient18, product.strMeasure18);
  list += VerifyIngredient(product.strIngredient19, product.strMeasure19);
  list += VerifyIngredient(product.strIngredient20, product.strMeasure20);

  const htmlItem = `
    <h2 class="divider">${name}</h2>
    <h3>Recipe Area: ${product.strArea}</h3>

    <div id=productimagediv>
        <img class="divider" id=productimage src="${img}" alt="${name}" /><ul style="float: right; margin-right: 200px; list-style-type: square;"><li>Ingredients</li>${list}</ul>
    </div>

            <h3>Instructions</h3>
            <p class="product__description">
              ${instruction}
            </p>
    `;
  return htmlItem;
}

function BuildPage(data) {
  //const displayItems = [];
  //for (var item in data) {
  //  displayItems.Push(productCardTemplate(item));
  //}
  const displayItems = data.map((x) => productCardTemplate(x));
  //var displayItems = renderListWithTemplate(productCardTemplate, categories);
  document
    .getElementById("recipe-display")
    .insertAdjacentHTML("afterbegin", displayItems.join(""));
}

async function Load() {
  loadHeaderFooter();
  var value = getItemFromUrl("id");
  var data = await GetRecipe(value);
  BuildPage(data.meals);
}

Load();
