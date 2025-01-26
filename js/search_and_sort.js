import { data, container} from './crud.js';
const searchBar = document.getElementById('input');
const getFormSection = document.getElementById('handleTasks');

searchBar.addEventListener('input', e=>{
    Array.from(container.children).forEach(child => {
        if (child !== getFormSection) child.remove();
    });
    
    const val = e.target.value.trim().toLowerCase();
    const filteredArray = data.filter(e=>e.title.trim().toLowerCase().includes(val));
    filteredArray.forEach(e=>{
        const cardDiv = document.createElement('div')
        cardDiv.id=e.title.trim().replaceAll(' ', '-').toLowerCase();
        cardDiv.classList.add('cards');
        cardDiv.innerHTML=`
            <h3 onclick='show_card(this)' >${e.title.toUpperCase()}</h3>
                <small onclick='show_card(this)'>Date : ${e.date}</small>
                <p onclick='show_card(this)' ><span>Note : </span>${e.task}</p>
                <div class="card_btns">
                    <i class="fa fa-pencil" onclick='edit_btn(this)' aria-hidden="true"></i>
                    <i class="fa fa-trash" onmouseover="onMouseOver_btn(this)" onmouseleave="onMouseOut_btn(this)" onclick="onClick_btn(this)" aria-hidden="true"></i>
                </div>`
        // container.insertAdjacentElement('beforeend', cardDiv);
        container.appendChild(cardDiv)
    })
})
