import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase,ref,push } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';



const inputVal = document.getElementById("add-input");
const addBtn = document.getElementById("add-btn");

const appSetting = {
    databaseURL: "https://notebook-e41b3-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSetting)
const db = getDatabase(app);
const taskInDb = ref(db,"tasks")


console.log(app)


addBtn.addEventListener("click",function(){
    const inputValue = inputVal.value
     console.log(inputValue)
     console.log(`${inputValue} added to database`)
     push(taskInDb,inputValue)
})
