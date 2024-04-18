import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://test-eec64-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");

const btn = document.getElementById("btn");
const input = document.getElementById("name-id");
const shoppingList = document.getElementById("shopping-list");

btn.addEventListener("click", sendData);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendData();
  }
});
btn.addEventListener("touchend", (e) => {
  e.preventDefault();
  sendData();
});

function sendData() {
  input.focus();
  let value = input.value;
  if (value.trim() == "") return;
  push(shoppingListInDb, value);
  input.value = "";
}

onValue(shoppingListInDb, function (snapshot) {
  if (!snapshot.exists()) {
    shoppingList.innerHTML = "No Items Exists";
    return;
  }
  const valList = Object.entries(snapshot.val());
  shoppingList.innerHTML = "";
  valList.forEach((item) => {
    // shoppingList.innerHTML += `<li>${val}</li>`;
    appendItemToShoppingListEl(item);
  });
  window.scrollTo(0, shoppingList.scrollHeight);
});

function appendItemToShoppingListEl(item) {
  let newEl = document.createElement("li");
  newEl.textContent = item[1];
  newEl.addEventListener("dblclick", function () {
    // alert("a click happened: "+item[0]);
    const itemRef = ref(database, `shoppingList/${item[0]}`);
    remove(itemRef);
  });
  shoppingList.append(newEl);
}
