import {container, data} from './crud.js';
import * as utilities from './utilities.js'
const getParentStyles=e=>({p : e.parentElement.parentElement, s : e.parentElement.parentElement.style});
const onMouseOver_btn=r=>{
    const {s} = getParentStyles(r);
    s.backgroundColor = 'red';
    s.color='#fff';
}
const onMouseOut_btn=r=>{
    const {s} = getParentStyles(r);
    s.backgroundColor = '';
    s.color='';
}
const onClick_btn=r=>{
    const {p}=getParentStyles(r);
    p.innerHTML+=`
        <div class='delete' >
            <p>Delete the note?</p>
            <div>
                <button onclick="handleYes_btn(this)">Yes</button>
                <button onclick="handleNo_btn(this)">No</button>
            </div>
        </div>
    `;
}
const handleYes_btn=e=>{
    let {p} = getParentStyles(e);
    p = p.parentElement; 
    const id=p.id.replaceAll('-',' ').toLowerCase().trim();
    const index = data.findIndex(e=>e.title.toLowerCase().trim()===id);
    if (index===-1){
        alert('cannot find index')
    } 
    data.splice(index,1);
    utilities.putIntoLocalData(data);
    p.remove()
    data.length==0 && handleZeroTasks("NO notes created, create a new one")
}
const handleNo_btn=e=>{
    const {p} = getParentStyles(e);
    p.parentElement.style.backgroundColor='';
    p.parentElement.style.color='';
    p.parentElement.lastElementChild.remove();
}
const handleTask_btn=e=>{
    const text=e.textContent;
    if (text.trim()==='add new'){
        e.textContent='close';
    }else{
        e.textContent='add new'
    }
}
{
    window.onMouseOut_btn = onMouseOut_btn;
    window.onMouseOver_btn = onMouseOver_btn;
    window.onClick_btn = onClick_btn;
    window.handleYes_btn = handleYes_btn;
    window.handleNo_btn = handleNo_btn;
    window.handleTask_btn = handleTask_btn;
}