import {
  loadHeaderFooter,
  getItemFromUrl,
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";
import { GetRecipe } from "./ExternalSources.mjs";

function VerifyIngredient(ingredient, measurement) {
  if (ingredient != "") {
    return `<tr><td>${ingredient} - ${measurement}</td></tr>`;
  }
  return "";
}

async function addProductToCart(product) {
  let cartItems;
  let objArr = new Array();
  let newCart = new Array();
  var data;

  // If any items in local storage
  if (localStorage.getItem("saved") !== null) {
    cartItems = [getLocalStorage("saved")];

    // Parse current cart items if any and add to objArr
    if (cartItems[0] != null) {
      let items = cartItems[0].flat(10);
      objArr = items.map((x) => JSON.parse(x));
    }

    // Deal with possible null entry
    if (objArr[0] == null) {
      objArr.shift();
    }
  }

  // Add old items if any and add new item
  if (objArr.length > 0) {
    for (let x in objArr) {
      newCart.push(JSON.stringify(objArr[x]));
    }
    // Get item
    data = await GetRecipe(product);
    newCart.push(JSON.stringify(data));
  }
  // If no old items set new item as first item
  else {
    data = await GetRecipe(product);
    newCart = [JSON.stringify(data)];
  }

  // Set item "so-cart" in the local storage
  setLocalStorage("saved", newCart);

  document.getElementById("save").innerHTML = "Saved";
  document
    .getElementById("save")
    .removeEventListener("click", addToCartHandler);
}

function productCardTemplate(product) {
  var img = product.strMealThumb;
  var name = product.strMeal;
  var instruction = product.strInstructions;
  var idMeal = product.idMeal;
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
        <img class="divider" id=productimage src="${img}" alt="${name}" /><table style="float: clear; float: right; margin-right: 200px; list-style-type: square; max-width: 300px;"><tr><td><h3>Ingredients</h3></td></tr>${list}</table>
    </div>

            <h3>Instructions</h3>
            <p class="product__description">
              ${instruction}
            </p>
            <button id="save" data-id="${idMeal}">Save Me</button>
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
  document.getElementById("save").addEventListener("click", addToCartHandler);
}

async function Load() {
  loadHeaderFooter();
  var value = getItemFromUrl("id");
  var data = await GetRecipe(value);
  BuildPage(data.meals);
}

Load();

// add to cart button event handler
async function addToCartHandler(e) {
  var id = e.target.dataset.id;
  await addProductToCart(id);
  //alertMessage("Item added to cart!", false);
}
