import * as all from './utilities.js';
const container = document.getElementById('cards_container');
const addTask_btn = document.getElementById('addTask_btn');
// const add_btn = document.getElementById('addTask_btn');
addTask_btn.addEventListener('click',()=>{
    const writeTasks = document.getElementById('handleTasks');
    writeTasks.classList.toggle("show")
    console.log('add_btn', addTask_btn.textContent)
    try{
        document.querySelector('.remove_card').remove();
        console.log('card removed')
    }catch{
        console.log('error, empty card not removedd')
    }
    if (addTask_btn.textContent.trim()==='add new'){
        if (data.length==0)
            handleZeroTasks("NO notes created, create a new one")
        clearForm();
    }
})

const data=all.fetchLocalData();
container.innerHTML=all.newTasks;
data.forEach(e=>{
    container.innerHTML+=all.cardSkeleton(e.title, e.date, e.task)
})
const form = document.querySelector("#form");
const titleForm = document.getElementById('headingInput');
const dateForm = document.getElementById('dateInput');
const taskForm = document.getElementById('taskInput');
form.addEventListener('submit',e=>{
    e.preventDefault();
    console.log('form submitted')
    validation();
    console.log('form submission completed')
})

const validation=()=>{
    const err = document.querySelector('.err');
    if (err.classList.contains('err_active'))
        err.classList.remove('err_active');
    const e = document.querySelector('.err');
    const t = titleForm.value;
    const d = dateForm.value;
    const tsk = taskForm.value;
    if(t.trim()===''){
        err.classList.add('err_active');
        e.textContent='Title cannot be empty.';
        return;
    }else if(t.includes('-')){
        err.classList.add('err_active');
        e.textContent='Title cannot include "-" symbol.';
        return;
    }
    storeData(t, d, tsk);
    addTask_btn.dispatchEvent(new Event('click'));
}

const storeData=(t,d,tsk)=>{
    data.push({
        title : t, date : d, task : tsk
    })
    all.putIntoLocalData(data);
    clearForm();
    const cardDiv = document.createElement('div')
    cardDiv.id=t.trim().toLowerCase();
    cardDiv.classList.add('cards');
    cardDiv.id=t.replaceAll(' ', '-').toLowerCase();
    cardDiv.innerHTML=`
        <h3 onclick='show_card(this)' >${t.toUpperCase()}</h3>
            <small onclick='show_card(this)'>Date : ${d}</small>
            <p onclick='show_card(this)' ><span>Note : </span>${tsk}</p>
            <div class="card_btns">
                <i class="fa fa-pencil" onclick='edit_btn(this)' aria-hidden="true"></i>
                <i class="fa fa-trash" onmouseover="onMouseOver_btn(this)" onmouseleave="onMouseOut_btn(this)" onclick="onClick_btn(this)" aria-hidden="true"></i>
            </div>`
    container.insertAdjacentElement('beforeend', cardDiv);
}

const clearForm=()=>{
    titleForm.value='';
    dateForm.value='';
    taskForm.value='';
}

const edit_btn=e=>{
    addTask_btn.dispatchEvent(new Event('click'))
    const p = e.parentElement.parentElement;
    console.log('classList', p.classList)
    console.log('id after', p.id)
    const id = p.id.replaceAll('-',' ').trim().toLowerCase();
    console.log('id before', id)
    const index = data.findIndex(e=>{
        console.log(e);
        return e.title.trim().toLowerCase()===id;
    });
    if (index===-1){
        alert('index problem')
        console.log('index', index)
    } 
    titleForm.value=data[index].title;
    dateForm.value=data[index].date;
    taskForm.value=data[index].task!==''?data[index].task:'';
    p.remove()
    data.splice(index, 1);
    all.putIntoLocalData(data)
}
document.getElementById("clear_btn").addEventListener('click', ()=>taskForm.value='')
document.getElementById("close_btn").addEventListener('click',()=>{
    const t = titleForm.value;
    const d = dateForm.value;
    const tsk = taskForm.value;
    addTask_btn.dispatchEvent(new Event("click"));
    titleForm.value = t;
    dateForm.value = d;
    taskForm.value = tsk;
    // data.length==0 && handleZeroTasks("NO notes created, create a new one")
})
{
    window.edit_btn = edit_btn;
}
const handleZeroTasks=val=>{
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('cards', 'remove_card');
    cardDiv.innerHTML =`
        <h1 onclick='show_card(this)'>${val.toLowerCase()}</h1>
    `;
    container.insertAdjacentElement('beforeend', cardDiv);
}
{
    window.handleZeroTasks = handleZeroTasks;
    data.length===0 && handleZeroTasks('NO notes created, create a new one');
}
export {container, data};