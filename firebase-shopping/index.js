import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
	databaseURL: "https://shopping-c936f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");
console.log(app);

const btn = document.getElementById("btn");
const input = document.getElementById("name-id");
const shoppingList = document.getElementById("shopping-list");

btn.addEventListener("click", function(){
	let value = input.value;
	console.log("the value is: ", value);
	push(shoppingListInDb, value);
	input.value = "";
});

onValue(shoppingListInDb, function(snapshot){
	
	if(!snapshot.exists()){
		shoppingList.innerHTML = 'No Items Exists';
		return;
	} 
	const valList = Object.entries(snapshot.val());
	console.log("the snapshot is: ", valList);
	shoppingList.innerHTML = '';
	valList.forEach((item)=>{
		// shoppingList.innerHTML += `<li>${val}</li>`;
		appendItemToShoppingListEl(item);
	});
});

function appendItemToShoppingListEl(item){
	const itemVal = item[1];
	let newEl = document.createElement("li");
	newEl.textContent = item[1];
	newEl.addEventListener("click", function(){
		// alert("a click happened: "+item[0]);
		const itemRef = ref(database, `shoppingList/${item[0]}`);
		remove(itemRef);
	});
	shoppingList.append(newEl);
}