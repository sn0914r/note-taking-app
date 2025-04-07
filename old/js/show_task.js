const show_card=e=>{
    const div = document.createElement('div');
    div.id = 'popUpBox';
    div.classList.add('open_popup');
    div.innerHTML = `
            <h3>${e.parentElement.children[0].textContent}</h3>
            <p>${e.parentElement.children[1].textContent || 'No deadline'}</p>
            <div>
            <h1 style= >Note : </h1>
                ${e.parentElement.children[2].textContent.replace('Task : ','').replace(':','')}
            </div>
            <button id='closePopUp' onclick='close_btn_popup(this)' >close</button>
        `
    document.body.insertAdjacentElement("beforebegin", div);
}
const close_btn_popup=r=>{
    r.parentElement.classList.toggle('close_popup');
    r.parentElement.remove()
}