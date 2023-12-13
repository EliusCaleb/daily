import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase,ref,push,onValue} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';



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
     push(taskInDb,inputValue)
     clearInput()
     
})

onValue(taskInDb,function(snapshort){
    console.log(snapshort.val()) 
    let taskArray = Object.values(snapshort.val())
    console.log(taskArray)
      clearTaskList()
    for(let i=0; i<taskArray.length;i++){
        let currentTask=taskArray[i]
        addTask(currentTask)
    }
})

function clearTaskList(){
    taskListing.innerHTML =``
}

function clearInput(){
    inputField.value= ''
}

function addTask(itemValue){
    taskListing.innerHTML +=`<li> ${itemValue}</li>`
}
