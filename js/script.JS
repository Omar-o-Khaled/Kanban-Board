let ready=document.getElementById("ready");
let progress=document.getElementById("progress");
let compeletd=document.getElementById("compeletd");

let box=document.querySelectorAll(".box");
let taskcontainer=document.getElementsByClassName("tasks")
let alltasks=document.querySelectorAll(".task");
let add=document.querySelectorAll(".add");
let edit=document.getElementsByClassName("edit");
let deleteTask=document.getElementsByClassName("delete");

let fristAdd=document.getElementById("fr_add");
let secondAdd=document.getElementById("sec_add");
let thirdAdd=document.getElementById("thirtd_add");

let readyTaskElement=document.querySelector(".readyTask");
let progressTaskElement=document.querySelector(".progressTask");
let compeletdTaskElement=document.querySelector(".compeletdTask");

let popup=document.querySelector(".popup");
let input=document.querySelector("#addInput");
let btnAdd=document.querySelector(".btnAdd");
let btnCancel=document.querySelector(".btnCancel");

let arrayReady=[];
let arrayProgress=[];
let arrayCompeletd=[];

taskcontainer=[...taskcontainer]
add=[...add]

function checkNotEmptyTaskContainer(ele){
    if(ele.children.length===0){
        ele.nextElementSibling.classList.add("empty");
    }else{
        ele.nextElementSibling.classList.remove("empty");
    }
}
function accessToAllEmptyTaskContainer(){
    checkNotEmptyTaskContainer(readyTaskElement)
    checkNotEmptyTaskContainer(progressTaskElement)
    checkNotEmptyTaskContainer(compeletdTaskElement)
}
accessToAllEmptyTaskContainer();

fristAdd.addEventListener("click",showPopUp)
secondAdd.addEventListener("click",showPopUp)
thirdAdd.addEventListener("click",showPopUp)

function showPopUp(addButton){
    popupId(addButton)
    popup.classList.add("show");
    emptyAndFocusInput();
    getElementFromMyBox();
}

btnCancel.addEventListener("click",removePopUp);

function removePopUp(){
    popup.classList.remove("show");
    popup.removeAttribute("id");
}

popup.addEventListener("click",()=>{
    popup.classList.remove("show");
    deletaTask()

})
function popupStopPropagationElements(){
    btnAdd.addEventListener("click",popupStopPropagation)
    input.addEventListener("click",popupStopPropagation)
    document.querySelector(".popupcontainer").addEventListener("click",popupStopPropagation);
}
popupStopPropagationElements()

function popupStopPropagation(btn){
    btn.stopPropagation();
}
function popupId(ele){
    if(ele.target.id=="fr_add"){
        popup.id="fromFristAdd";
    }else if(ele.target.id=="sec_add"){
        popup.id="fromSecondAdd";
    }else if(ele.target.id=="thirtd_add"){
        popup.id="fromThirdAdd";
    }
}

btnAdd.addEventListener("click",returnInputValue);

function returnInputValue(){
    let inputValue=input.value.trim();
    if(inputValue){
        let objValueInput={
            value:inputValue,
            id:new Date().getTime()
        }
        return objValueInput;
    }
}
function emptyAndFocusInput(){
    input.value="";
    input.focus();
}
btnAdd.addEventListener("click",WhichArray);

function WhichArray(){
    if(returnInputValue()){
        if(popup.id=="fromFristAdd"){
            arrayReady.push(returnInputValue());
            createElement(arrayReady,readyTaskElement);
            addObjToLocalStorage("ReadyArray",arrayReady)
        }else if(popup.id=="fromSecondAdd"){
            arrayProgress.push(returnInputValue());
            createElement(arrayProgress,progressTaskElement);
            addObjToLocalStorage("ProgressArray",arrayProgress)
        }else if(popup.id=="fromThirdAdd"){
            arrayCompeletd.push(returnInputValue());
            createElement(arrayCompeletd,compeletdTaskElement);
            addObjToLocalStorage("CompeletdArray",arrayCompeletd)
        }
    }
    emptyAndFocusInput();
    accessToAllEmptyTaskContainer();
    addDragClassToMe();
    deletaTask()

}

function createElement(fromMyArray,addToMe){
    addToMe.innerHTML="";

    fromMyArray.map((objFromArray)=>{
        let taskDiv=document.createElement("div");
        let taskText=document.createElement("div");
        let taskImg=document.createElement("div");
        let editImg=document.createElement("img");
        let deleteImg=document.createElement("img");
        let ionRight=document.createElement("div");

        taskDiv.className="task";
        taskDiv.draggable="true"
        taskDiv.id=objFromArray.id;
        taskText.className="text";
        taskImg.className="imgs";
        editImg.className="edit";
        deleteImg.className="delete";
        ionRight.className="right";

        editImg.src="img/edit.png";
        deleteImg.src="img/delete.png";

        editImg.alt="edit";
        deleteImg.alt="Delete";
        
        taskText.innerHTML=objFromArray.value;
        ionRight.innerHTML='<ion-icon name="checkmark-outline"></ion-icon>';
        ionRight.classList.add("showRight")

        taskImg.append(editImg,deleteImg);
        taskDiv.append(taskText,taskImg,ionRight);
        addToMe.append(taskDiv);

    deletaTask()
    })
}

function addObjToLocalStorage(arrayTaskName,myArray){
    window.localStorage.setItem(arrayTaskName,JSON.stringify(myArray))
}

function createElementFromLocalStorage(){
    if(window.localStorage["ReadyArray"]){
        arrayReady=JSON.parse(window.localStorage["ReadyArray"])
        createElement(arrayReady,readyTaskElement);
    } 
    if(window.localStorage["ProgressArray"]){
        arrayProgress=JSON.parse(window.localStorage["ProgressArray"])
        createElement(arrayProgress,progressTaskElement);
    }
    if(window.localStorage["CompeletdArray"]){
        arrayCompeletd=JSON.parse(window.localStorage["CompeletdArray"])
        createElement(arrayCompeletd,compeletdTaskElement);
    }
    accessToAllEmptyTaskContainer();
}
createElementFromLocalStorage();

let clearAll=document.querySelector(".clearAll");
let clearContainer=document.querySelector(".clearContainer");
let btnClear=document.getElementById("DeleteAllTasks");
let btnClearCancel=document.getElementById("CancelDelete");

clearAll.addEventListener("click",showClearPopUp);
btnClear.addEventListener("click",clearAllTasks)
btnClearCancel.addEventListener("click",removeClearPopUp);

function showClearPopUp(){
    clearContainer.classList.toggle("showClear");
}
function clearAllTasks(){
    window.localStorage.clear();
    arrayReady=[];
    arrayProgress=[];
    arrayCompeletd=[];
    readyTaskElement.innerHTML="";
    progressTaskElement.innerHTML="";
    compeletdTaskElement.innerHTML="";
    accessToAllEmptyTaskContainer();
    removeClearPopUp();
}

function removeClearPopUp(){
    clearContainer.classList.remove("showClear");
}

document.addEventListener("keypress",addTaskByEnter)
function addTaskByEnter(ele){
    if(ele.keyCode==13 && popup.classList.contains("show")){
        returnInputValue()
        WhichArray()
    }
}

function addDragClassToMe(){
    let box=document.querySelectorAll(".box");
    let alltasks=document.querySelectorAll(".task");
    alltasks=[...alltasks];
    alltasks.forEach((singleTask)=>{
        singleTask.addEventListener("dragstart",()=>{
            setTimeout(()=>{singleTask.classList.add("dragging")},0)
            
        })
        singleTask.addEventListener("dragend",()=>{singleTask.classList.remove("dragging")})
    })
}


addDragClassToMe()

function dragFunction(e) {
    e.preventDefault()
    let dragItem=document.querySelector(".dragging")
    let siblingTasks=[...this.children[1].children]
    let targetSibling=siblingTasks.find((ele)=>{
        return e.clientY <= ele.offsetTop + ele.offsetHeight/2;
    })
    this.children[1].insertBefore(dragItem,targetSibling);
    this.classList.add("boxDrag");
    accessToAllEmptyTaskContainer();
    deletaTask()
}

ready.addEventListener("dragover", dragFunction);
progress.addEventListener("dragover",dragFunction);
compeletd.addEventListener("dragover",dragFunction);

ready.addEventListener("dragleave",dragleaveFunction);
progress.addEventListener("dragleave",dragleaveFunction);
compeletd.addEventListener("dragleave",dragleaveFunction);


function dragleaveFunction(){
    this.classList.remove("boxDrag");
    addNewElementToMyArray();
}

document.addEventListener("dragend",addNewElementToMyArray)

document.addEventListener("click",editAfterDrag)
function editAfterDrag(ele){
    if(ele.target.closest(".right")){
        addNewElementToMyArray()
    }
}

function addNewElementToMyArray(){
    let allboxdrag=[...document.querySelectorAll(".boxDrag")];
    allboxdrag.map((box)=>{
        box.classList.remove("boxDrag");
    })
    getElementFromMyBox();
}

function getElementFromMyBox(){
    
    let readyTaskElement=document.querySelector(".readyTask");
    let progressTaskElement=document.querySelector(".progressTask");
    let compeletdTaskElement=document.querySelector(".compeletdTask");

    createObjectFromTaskElemnet(readyTaskElement,arrayReady,"ReadyArray");
    createObjectFromTaskElemnet(progressTaskElement,arrayProgress,"ProgressArray");
    createObjectFromTaskElemnet(compeletdTaskElement,arrayCompeletd,"CompeletdArray");
}

function createObjectFromTaskElemnet(NewBoxTask,myArray,arrNameInStorage){
    myArray=[]
    let tasksArray=[...NewBoxTask.children];
    tasksArray.map((singleTask)=>{
        
        let singleTaskChild=[...singleTask.children];
        let text=singleTaskChild[0].innerHTML;
        
        let objArray={
            value:text,
            id:+singleTask.id
        }
        myArray.push(objArray);
    })
    addObjToLocalStorage(arrNameInStorage,myArray)
    deletaTask();
}

function deletaTask(){  
    let allTasks=[...document.querySelectorAll(".delete")];
    allTasks.map((singleDelete)=>{
                singleDelete.onclick=function(){
                    let task=singleDelete.closest(".task");
                    task.remove();
                    getElementFromMyBox();
                    renewArray(task,arrayReady);
                    renewArray(task,arrayProgress);
                    renewArray(task,arrayCompeletd);
                    accessToAllEmptyTaskContainer();
                }
            })
        }
deletaTask();


function renewArray(task,myArray){
    for(let i=0;i<myArray.length;i++){
        if(task.id==myArray[i].id){
            myArray.splice(i,1);
        }
    }
}

function deleteTaskFromBox(){
    let allTasks=[...document.querySelectorAll(".delete")];
    allTasks.map((singleDelete)=>{
        singleDelete.onclick=function(){
            let task=singleDelete.closest(".task");
            task.remove();
            getElementFromMyBox();
            accessToAllEmptyTaskContainer();
        }
    })
    
}

document.addEventListener("dragend",()=>{
    ArrayAfterDrop();
})

function ArrayAfterDrop(){
    let readyChild=[...readyTaskElement.children];
    let progressChild=[...progressTaskElement.children];
    let compeletdChild=[...compeletdTaskElement.children];
    
        arrayReady=[];
        arrayProgress=[];
        arrayCompeletd=[];

        readyChild.map((task)=>{
            let taskText=task.children[0].innerHTML;
            let taskID=+task.id;
    
            let ArrOBJ={
                value:taskText,
                id:taskID
            }
            arrayReady.push(ArrOBJ);
        })

    progressChild.map((task)=>{
            let taskText=task.children[0].innerHTML;
            let taskID=+task.id;
    
            let ArrOBJ={
                value:taskText,
                id:taskID
            }
            arrayProgress.push(ArrOBJ);
        })

    compeletdChild.map((task)=>{
            let taskText=task.children[0].innerHTML;
            let taskID=+task.id;
    
            let ArrOBJ={
                value:taskText,
                id:taskID
            }
            arrayCompeletd.push(ArrOBJ);
        })
        checkAllTasks();
}


document.addEventListener("click",removeRight);

function removeRight(ele){
    let rightElement=ele.target.closest(".right");
    let imgElement=ele.target.closest(".imgs");
    let editElement=ele.target.closest(".edit");
    
    let allRight=[...document.querySelectorAll(".right")];
    let allEdit=[...document.querySelectorAll(".edit")];
    let allimgs=[...document.querySelectorAll(".imgs")];

    if(rightElement){
        let imgPrevious=rightElement.previousElementSibling;
        let textElemet=imgPrevious.previousElementSibling;
        if(textElemet.innerHTML){
            rightElement.classList.add("showRight");
            imgPrevious.classList.remove("showEdit");
            textElemet.removeAttribute("contenteditable");
        }else{
            textElemet.focus();
        }
    }
    if(editElement){
    let targetRight=imgElement.nextElementSibling;
    let text=imgElement.previousElementSibling;

    let allText=[...document.querySelectorAll(".text")];

        allimgs.forEach((singleImg)=>{
            singleImg.classList.remove("showEdit");
        })
        
        allRight.forEach((singleRight)=>{
            singleRight.classList.add("showRight");
        })
        
        allText.forEach((singleText)=>{
            singleText.removeAttribute("contenteditable");
        })

        imgElement.classList.add("showEdit");
        targetRight.classList.remove("showRight");
        text.setAttribute("contenteditable","true");
        text.focus();
    }
    ArrayAfterDrop();
}
function checkAllTasks(){
    let readyChild=[...readyTaskElement.children];
    let progressChild=[...progressTaskElement.children];
    let compeletdChild=[...compeletdTaskElement.children];

    if(readyChild.length==0 && 
        progressChild.length==0 && 
        compeletdChild.length==0){
            clearAll.classList.add("hide");
        }else{
            clearAll.classList.remove("hide");
        }
        
}
checkAllTasks();

let color_one=document.getElementById("color_one");
let color_two=document.getElementById("color_two");
let color_three=document.getElementById("color_three");
let color_four=document.getElementById("color_four");

color_one.addEventListener("click",addMyColorToBody)
color_two.addEventListener("click",addMyColorToBody)
color_three.addEventListener("click",addMyColorToBody)
color_four.addEventListener("click",addMyColorToBody)

function addMyColorToBody(ele){
    document.body.removeAttribute("class");
    document.body.classList.add(ele.target.classList[1]);
    removeAllActiveColor();
    ele.target.classList.add("activeColor");
    window.localStorage.setItem("Color",window.getComputedStyle(ele.target, null).getPropertyValue("background-color"));
}

function removeAllActiveColor(){
    color_one.classList.remove("activeColor")
    color_two.classList.remove("activeColor")
    color_three.classList.remove("activeColor")
    color_four.classList.remove("activeColor")
}

function colorLocalStorage(){
    if(window.localStorage["Color"]){
        if(window.getComputedStyle(color_one, null).getPropertyValue("background-color")==window.localStorage["Color"]){
            color_one.classList.add("activeColor")
        }else if(window.getComputedStyle(color_two, null).getPropertyValue("background-color")==window.localStorage["Color"]){
            color_two.classList.add("activeColor")
        }else if(window.getComputedStyle(color_three, null).getPropertyValue("background-color")==window.localStorage["Color"]){
            color_three.classList.add("activeColor")
        }else if(window.getComputedStyle(color_four, null).getPropertyValue("background-color")==window.localStorage["Color"]){
            color_four.classList.add("activeColor")
        }
        let ActiveElment=document.querySelector(".activeColor")
        document.body.classList.add(ActiveElment.classList[1]);
    }
}
colorLocalStorage()