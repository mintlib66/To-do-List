"use strict" 

//변수 선언
const input_title = document.querySelector(".editor__input-title");
const input_body = document.querySelector(".editor__input-body");
const input_add_btn = document.querySelector(".editor__add");
const input_clear_btn = document.querySelector(".editor__clear");

const todo_list = document.querySelector(".todo-list__list");
const todo_item_edit_btn = document.querySelector(".item__edit");
const todo_item_delete_btn = document.querySelector(".item__delete");

//button클릭 이벤트
function addTodoButtonClick(){
    const title = input_title.value;
    const body = input_body.value;

    if(checkInputBlank(title, body)){
        addNewTodoInList(title, body);
        clearInput();
    } 
}

//input부분 내용 비우기
function clearInput(){
    input_title.value = "";
    input_body.value = "";
}

//input내용 검사
function checkInputBlank(title, body){
    if(title === ""){
        alert("Write to do title.");
        return false;
    }else if(body === ""){
        alert("Write to do.");
        return false;
    }
    return true;
}
//입력 내용 노드로 추가하기
function addNewTodoInList(title, body){ 
    const element = document.createElement("li");
    const element_title = document.createElement("h2");
    const element_body = document.createElement("p");
    const element_btn_box = document.createElement("div");
    const element_btn_edit = document.createElement("button");
    const element_btn_delete = document.createElement("button");

    element_title.textContent = title;
    element_body.textContent = body;
    element_btn_edit.textContent = "edit";
    element_btn_delete.textContent = "delete";
    
    element.className = "todo-list__item";
    element_title.className = "todo-list__item-title";
    element_body.className = "todo-list__item-body";
    element_btn_box.className = "todo-list__item-btns";
    element_btn_edit.className = "item__edit";
    element_btn_delete.className = "item__delete";
    
    element_btn_box.append(element_btn_edit, element_btn_delete);
    element.append(element_title, element_body, element_btn_box);
    todo_list.appendChild(element);

    element_btn_edit.addEventListener("click", editTodo);
    element_btn_delete.addEventListener("click", deleteTodo);
}

//todo edit
function editTodo(){
    const todo_node_item = this.parentNode.parentNode;
    const title_text = todo_node_item.children[0].innerHTML;
    const todo_text= todo_node_item.children[1].innerHTML;

    //make todo hidden 
    const item_array = Array.from(todo_node_item.children);
    item_array.forEach(element => {
        element.className += " hidden";
    });

    //make editor
    const todo_edit_box = document.createElement("div");
    const edit_title = document.createElement("input");
    const edit_todo = document.createElement("textarea");
    const todo_btn_box = document.createElement("div");
    const edit_btn_ok = document.createElement("button");
    const edit_btn_cancel = document.createElement("button");

    todo_edit_box.className = "editor__input";
    edit_title.className = "editor__input-title";
    edit_todo.className = "editor__input-body";
    todo_btn_box.className = "editor__btns";

    edit_title.value = title_text;
    edit_todo.value = todo_text;
    edit_btn_ok.textContent = "OK";
    edit_btn_cancel.textContent = "cancel";

    todo_btn_box.append(edit_btn_ok, edit_btn_cancel);
    todo_edit_box.append(edit_title, edit_todo, todo_btn_box);
    todo_node_item.appendChild(todo_edit_box);

    edit_btn_ok.addEventListener("click", completeEditTodo);
    edit_btn_cancel.addEventListener("click", cancelEditTodo);
}

function completeEditTodo(){
    const todo_node_item = this.parentNode.parentNode.parentNode;
    const updated_title = this.parentNode.parentNode.children[0].value;
    const updated_todo = this.parentNode.parentNode.children[1].value;
    const todo_title = todo_node_item.children[0];
    const todo_body= todo_node_item.children[1];
    const editor = todo_node_item.children[3];
    const item_array = Array.from(todo_node_item.children);

    //update 
    todo_title.innerHTML = updated_title;
    todo_body.innerHTML = updated_todo;

    //delete editor
    editor.remove();

    //show todo
    item_array.forEach(element => {
        element.classList.remove("hidden");
    });

}

function cancelEditTodo(){
    const todo_node_item = this.parentNode.parentNode.parentNode;
    const editor = todo_node_item.children[3];
    const item_array = Array.from(todo_node_item.children);

    //delete editor
    console.log(editor);
    editor.remove();

    //show todo
    item_array.forEach(element => {
        element.classList.remove("hidden");
    });
}

//todo delete
function deleteTodo(){
    this.parentNode.parentNode.remove();
}

if(input_add_btn){
    input_add_btn.addEventListener("click", addTodoButtonClick);
}
if(input_clear_btn){
    input_clear_btn.addEventListener("click", clearInput);
}
if(todo_item_edit_btn){
    todo_item_edit_btn.addEventListener("click", editTodo);
}
if(todo_item_delete_btn){
    todo_item_delete_btn.addEventListener("click", deleteTodo);
}

