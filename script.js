if(localStorage.getItem('data') == null){
    localStorage.setItem('data', '[]');
}
let old_data = JSON.parse(localStorage.getItem('data'));
console.log(old_data);


if(localStorage.getItem('checkedData') == null){
    localStorage.setItem('checkedData', '[]');
}
let check_data = JSON.parse(localStorage.getItem('checkedData'));





//variables
let buildingCounter = 0;
let allTasks = [];







const buildOldTasks = function(){
    for(items of old_data){
        let taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.setAttribute('id', 'task'+buildingCounter);


        let checkBtn = document.createElement('input');
        checkBtn.type = "checkbox";
        checkBtn.value = buildingCounter;
        
        //console.log(check_data);
        //checkBtn.checked = check_data[buildingCounter]
        console.log();
        



        checkBtn.setAttribute('onclick', "check(this.value)");
        checkBtn.setAttribute('id', 'checkbox'+buildingCounter);
        checkBtn.value = buildingCounter;
        checkBtn.setAttribute('id', 'checkbox'+buildingCounter);


        let taskTitle = document.createElement('p');
        taskTitle.innerText = items;
        taskTitle.setAttribute('id', 'taskText'+buildingCounter)


        if(check_data[buildingCounter] == "false"){
            checkBtn.checked = false;
            taskTitle.style.color = "black";
            taskTitle.style.textDecoration = "none";
        }
        else{
            checkBtn.checked = true;
            taskTitle.style.color = "grey";
            taskTitle.style.textDecoration = "line-through";
        }


        let btnDiv = document.createElement('div');
        btnDiv.classList.add('buttons');


        let editBtn = document.createElement('button');
        editBtn.innerText = "Edit";
        editBtn.setAttribute('id', 'editBtn' + buildingCounter);
        editBtn.setAttribute('onclick', "edit(this.value)");
        editBtn.value = buildingCounter;

        let removeBtn = document.createElement('button');
        removeBtn.innerText = "Remove";
        removeBtn.setAttribute('onclick', 'remove(this.value)')
        removeBtn.setAttribute('id', 'removeBtn' + buildingCounter);
        removeBtn.value = buildingCounter;
    



        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(removeBtn);

        taskDiv.appendChild(checkBtn);
        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(btnDiv);


        let tasksDiv = document.getElementById('tasks');
        tasksDiv.appendChild(taskDiv);

        buildingCounter++;
    }
        
}
buildOldTasks();









class task {
    constructor(text){
        this.text = text;
    }
    get taskText (){
        return this.text;
    }
}




// add button for adding a task to our list
let adding = function(){
    event.preventDefault()
    if(document.getElementById('intake').value === ""){
        window.alert("Please write your task");
        buildingCounter--;
    }else{
        allTasks[buildingCounter] = new task(document.getElementById('intake').value)
        //console.log(allTasks);
        //console.log(allTasks[buildingCounter].taskText);
        build(allTasks[buildingCounter].taskText);
    }
    buildingCounter++;
}

let build = function(x){

    let new_data = x;
    old_data.push(new_data);
    localStorage.setItem('data', JSON.stringify(old_data));

    
    check_data.push('false');
    localStorage.setItem('checkedData', JSON.stringify(check_data));



    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.setAttribute('id', 'task'+buildingCounter);


    let checkBtn = document.createElement('input');
    checkBtn.type = "checkbox";
    checkBtn.value = buildingCounter;
    checkBtn.setAttribute('onclick', "check(this.value)");
    checkBtn.setAttribute('id', 'checkbox'+buildingCounter);
    checkBtn.value = buildingCounter;
    checkBtn.setAttribute('id', 'checkbox'+buildingCounter);


    let taskTitle = document.createElement('p');
    taskTitle.innerText = x;
    taskTitle.setAttribute('id', 'taskText'+buildingCounter)


    let btnDiv = document.createElement('div');
    btnDiv.classList.add('buttons');


    let editBtn = document.createElement('button');
    editBtn.innerText = "Edit";
    editBtn.setAttribute('id', 'editBtn' + buildingCounter);
    editBtn.setAttribute('onclick', "edit(this.value)");
    editBtn.value = buildingCounter;

    let removeBtn = document.createElement('button');
    removeBtn.innerText = "Remove";
    removeBtn.setAttribute('onclick', 'remove(this.value)')
    removeBtn.setAttribute('id', 'removeBtn' + buildingCounter);
    removeBtn.value = buildingCounter;
    



    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(removeBtn);

    taskDiv.appendChild(checkBtn);
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(btnDiv);


    let tasksDiv = document.getElementById('tasks');
    tasksDiv.appendChild(taskDiv);
}















function check(value){
    console.log();
    if(document.getElementById(('checkbox')+value).checked == true){
        document.getElementById('taskText'+value).style.textDecoration = "line-through";
        document.getElementById('taskText'+value).style.color = "grey";
        check_data[value] = "true";
        localStorage.setItem('checkedData', JSON.stringify(check_data));
    }else{
        document.getElementById('taskText'+value).style.textDecoration = "none";
        document.getElementById('taskText'+value).style.color = "black";
        check_data[value] = "false";
        localStorage.setItem('checkedData', JSON.stringify(check_data));

    }
}

let remove = function(value){
    document.getElementById("task" + value).style.display = "none";
    old_data.splice(value, 1);
    localStorage.setItem('data', JSON.stringify(old_data));
}

let edit = function(value){
    event.preventDefault();
    console.log(value);
    document.getElementById('editForm').style.display = "flex";
    document.getElementById('submitBtn').value = value;
    
}





document.getElementById('submitBtn').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('editForm').style.display = "none";
    console.log(buildingCounter);
    console.log(document.getElementById('editedText').value);
    let temp = document.getElementById('submitBtn').value;
    document.getElementById('taskText'+temp).innerHTML = document.getElementById('editedText').value;
    old_data[temp] = document.getElementById('editedText').value;
    localStorage.setItem('data', JSON.stringify(old_data));
    console.log(temp);
})


const clearData = function(){
    old_data = [];
    check_data = [];
    localStorage.setItem('data', JSON.stringify(old_data));
    localStorage.setItem('checkedData', JSON.stringify(check_data))
    location.reload();
}