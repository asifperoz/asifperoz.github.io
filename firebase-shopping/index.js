import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
	const valList = Object.values(snapshot.val());
	console.log("the snapshot is: ", valList);
	shoppingList.innerHTML = '';
	valList.forEach((val)=>{
		shoppingList.innerHTML += `<li>${val}</li>`;
	});
});

