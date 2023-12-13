import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase,ref,push,onValue,remove,set} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';



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

    if (inputValue.trim() !== "") {
        const newTaskRef = push(taskInDb);
        
        set(newTaskRef, inputValue);

        clearInput();
    } else {
        alert("Kindly add a new task.");
    }
    
     
})

onValue(taskInDb,function(snapshort){
    console.log(snapshort.val()) 

    if(snapshort.exists()){
        let taskArray = Object.entries(snapshort.val())
        console.log(taskArray)
          clearTaskList()
        for(let i=0; i<taskArray.length;i++){
            let currentTask=taskArray[i]
            addTask(currentTask)
        }
    }else{
        taskListing.innerHTML = "No tasks Added"
    }
   
})

function clearTaskList(){
    taskListing.innerHTML =``
}

function clearInput(){
    inputField.value= ''
}

function addTask(item){
    //taskListing.innerHTML +=`<li> ${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    let checkbox = document.createElement("input")
    checkbox.type="checkbox"
    checkbox.id="review"

    newEl.appendChild(checkbox)

    let textValue= document.createElement("span")
    textValue.textContent = itemValue
    newEl.appendChild(textValue)

    let editButton = document.createElement("button")
    editButton.id="edit"

    editButton.textContent = "Edit"

    newEl.appendChild(editButton)

    editButton.addEventListener("click", function() {
        editTask(itemID, textValue);
    });



    let deleteButton = document.createElement("button")
    deleteButton.id="delete"

    deleteButton.textContent = "🗑️"

    newEl.appendChild(deleteButton)


    deleteButton.addEventListener("click", function() {
        let exactLocationOfTaskInDB = ref(db, `tasks/${itemID}`)
        
        remove(exactLocationOfTaskInDB)
    })


    
    taskListing.append(newEl)
}

function editTask(itemID,taskValue){
    let newTaskValue = prompt("Edit Task:", taskValue.textContent)

    if(newTaskValue !==null){
        taskValue.textContent = newTaskValue
        let exactLocationOfTaskInDB = ref(db, `tasks/${itemID}`)
        
        set(exactLocationOfTaskInDB,newTaskValue)
    }
    

}
