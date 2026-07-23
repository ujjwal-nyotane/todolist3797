const addButton = document.querySelector(".inputArea button");
let listForTask = [];
let task_Id_Last = 0;
const container = document.querySelector(".listOfTask");



function toDoAdd() {
    const inputBox = document.querySelector(".inputArea input");
    const inputText = (inputBox.value).trim();

    if (inputText.length > 0) {
        inputBox.value = "";
        const obj = {};
        obj.id = task_Id_Last++;
        obj.text = inputText
        listForTask.push(obj);

        toDoRender();
        

    }
}


function toDoRender() {
    if (!container.querySelector("ul")) {
        toDoCreate();
    }
    const ul = container.querySelector("ul");
    ul.innerHTML = ""
    listForTask.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${item.text}</span>`;
        li.innerHTML += "<span class='delete_item'>❌</span>";
        li.innerHTML += "<span class='edit_item'>✏️</span>"
        li.classList += "Tasks";
        li.id = item.id;
        ul.appendChild(li);
    });
    container.appendChild(ul);
    toDoSave();
}


function toDoCreate() {
    container.appendChild(document.createElement("ul"));
}
function changevalue(value,item){
    item.closest("li").id;
    for(let i of listForTask){
        if(item.closest("li").id == i.id){
            i.text=value;
        }
    }
    toDoRender();
}
function toDoEdit(item) {
    for(let i of listForTask){
        if(item.closest("li").id==i.id){
            console.log(item.closest('li').querySelector('span'))
            const cuurenttext= (item.closest("li").querySelector("span")).innerText;
            
            item.closest("li").innerHTML=`<input type="text" onchange="changevalue(this.value,this)" value="${cuurenttext}" autofocus >`;
            
        }
    }
}
function toDoDelete(item) {
    for (let i of listForTask) {
        if(item.closest("li").id == i.id){
        listForTask.splice(listForTask.indexOf(i),1);
        
        }
    }
    toDoRender();

}
function toDoCheck() {

}
function toDoSave() {
    localStorage.setItem("list", JSON.stringify(listForTask));
    localStorage.setItem("id", JSON.stringify(task_Id_Last));
}
function toDoRetrieve() {
    listForTask = JSON.parse(localStorage.getItem("list")) || [];
    task_Id_Last = JSON.parse(localStorage.getItem("id")) || 0;
    toDoRender();
}


toDoRetrieve()

addButton.addEventListener("click", () => toDoAdd());
container.addEventListener("click", (e) => {
    
    if ((e.target.classList).contains('delete_item')){
        
        toDoDelete(e.target);
    }
    if ((e.target.classList).contains("edit_item")){
        
        toDoEdit(e.target);
    }

})


