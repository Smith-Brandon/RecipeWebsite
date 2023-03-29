
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getItemFromUrl(parameters) {
  // Get Id from url query string
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(parameters);
  return product;
}

export function renderListWithTemplate(templateFn, list) {
  const displayItems = list.map((x) => getDisplayData(x));
  return displayItems;
}

function sortName(itemList) {
  var sortedItems = itemList.sort(function(a, b){
    let x = a.Name.toLowerCase();
    let y = b.Name.toLowerCase();
    if (x < y) {return -1}
    if (x > y) {return 1}
    return 0;
  });
  return sortedItems;
}

function sortPrice(itemList) {
  var sortedItems = itemList.sort(function(a, b){
    return a.ListPrice - b.ListPrice;
  });
  return sortedItems;
}

function getDisplayData(itemCard){
  return itemCard.data;
}

export function renderWithTemplate(templateFn, parentElement) {
  parentElement.insertAdjacentHTML("afterbegin", templateFn);
}

async function loadTemplate(path) {
    const response = await fetch(path);
    const template = response.text();
    return template;
}

export async function loadHeaderFooter(){
  const header = await loadTemplate("../partials/header.html");
  const footer = await loadTemplate("../partials/footer.html");
  const headerEle = document.querySelector("#main-header");
  const footerEle = document.querySelector("#main-footer");

  renderWithTemplate(header, headerEle);
  renderWithTemplate(footer, footerEle);
}

export function getSavedItemsFromStorage(key) {
  let dist = [];
  const cartItems = [getLocalStorage(key)];
  let items = cartItems[0];

  items = items.flat(10);
  const objArr = items.map((x) => JSON.parse(x));

  // Loop through items to mark duplicates as additional value in qty
  for (let i in objArr) {
    // Qty count
    let count = 0;
    // Look for duplicate items in array
    for (let x in objArr) {
      if ((objArr[i]["Name"] == objArr[x]["Name"]) && (objArr[i]["Colors"] == objArr[x]["Colors"])) {
        let qty = objArr[i]["qty"];
        if (qty == 0 || qty == null) qty = 1;
        count += qty;
      }
    }

    // Check if copy of item is already in dist array
    let first = true;
    for (let x in dist) {
      if ((dist[x]["Id"] == objArr[i]["Id"]) && (dist[x]["Colors"] == objArr[i]["Colors"])) {
        first = false;
      }
    }

    // If copy is not already in array add it with count qty element
    if (first) {
      let item = objArr[i];
      item["qty"] = count;
      dist.push(item);
    }
  }
  return dist;
}

