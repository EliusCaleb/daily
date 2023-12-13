import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase,ref,push } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';



const inputField = document.getElementById("add-input");
const addBtn = document.getElementById("add-btn");
const  taskListing = document.getElementById("showing")

const appSetting = {
    databaseURL: "https://notebook-e41b3-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSetting)
const db = getDatabase(app);
const taskInDb = ref(db,"tasks")


console.log(app)


addBtn.addEventListener("click",function(){
    const inputValue = inputField.value
     console.log(inputValue)
     console.log(`${inputValue} added to database`)
     push(taskInDb,inputValue)

     addTask(inputValue)
     clearInput()
     
})


function clearInput(){
    inputVal.value= ''
}

function addTask(itemValue){
    taskListing.innerHTML +=`<li> ${itemValue}</li>`
}
