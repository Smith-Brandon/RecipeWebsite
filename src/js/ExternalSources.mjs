import { getLocalStorage, setLocalStorage } from "./utils.mjs";


async function getData(path) {
  return fetch(path)
    .then(convertToJson)
    .then((data) => data);
}

async function convertToJson(res) {
  let resJ = await res.json();
  if (res.ok) {
    return resJ;
  } else {
    throw { name: "servicesError", message: resJ };
  }
}

export async function GetCategories() {
  var searchString = "https://www.themealdb.com/api/json/v1/1/categories.php";
  var foods = await getData(searchString);
  setLocalStorage("categories", JSON.stringify(foods));
  //CategoryTemplate(foods, "food-items");
}

if (localStorage.getItem("categories") === null) {
  GetCategories();
}

export async function GetACategory(category) {
  var searchString = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category;
  var data = getData(searchString);
  return data;
}

export async function SaveRecipe(recipe) {
  var local;
  if (localStorage.getItem("saved") !== null) {
    local = getLocalStorage("saved");
  }
  setLocalStorage("saved", JSON.stringify(recipe));
}

async function Search(param) {
  var searchString =
    "https://www.themealdb.com/api/json/v1/1/search.php?f=" + param;
  var data = await getData(searchString);
  return data;
  //GridTemplate(foods, "food-items");
}

function MealTemplate(foods, querySelector) {
  // Get display element
  const foodItemsDiv = document.getElementById(querySelector);
  // Build grid
  foods.meals.forEach((meal) => {
    const foodDiv = document.createElement("div");

    foodDiv.className = "meal";
    const foodInfo = `
  <h3>${meal.strCategory}</h3>

  `;
    foodDiv.innerHTML = foodInfo;
    foodItemsDiv.appendChild(foodDiv);
  });
}

function CategoryTemplate(foods, querySelector) {
  console.log(foods);
  // Get display element
  const foodItemsDiv = document.getElementById(querySelector);
}

export async function GetRecipe(param) {
  var searchString = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + param;
  var data = await getData(searchString);
  return data;
}

function CheckCategories(){
  if (localStorage.getItem("categories") === null) {
    GetCategories();
  }
}

CheckCategories();
