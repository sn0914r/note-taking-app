const cardSkeleton=(t, d, tsk)=>(
    `
        <div class="cards" id=${t.trim().replaceAll(' ','-').toLowerCase()}>
            <h3 onclick='show_card(this)'>${t.toUpperCase()}</h3>
            <small onclick='show_card(this)'>Date : ${d}</small>
            <p onclick='show_card(this)'><span>Note : </span>${tsk}</p>
            <div class="card_btns">
                <i class="fa fa-pencil" onclick='edit_btn(this)' aria-hidden="true"></i>
                <i class="fa fa-trash" onmouseover="onMouseOver_btn(this)" onmouseleave="onMouseOut_btn(this)" onclick="onClick_btn(this)" aria-hidden="true"></i>
            </div>
        </div>
    `
)
const fetchLocalData=()=>localStorage.getItem('notes-app-b5')?JSON.parse(localStorage.getItem('notes-app-b5')):[];
const putIntoLocalData=data=>localStorage.setItem('notes-app-b5',JSON.stringify(data));

const newTasks=
    `
        <section id="handleTasks">
            <h1>ADD or EDIT NOTES : </h1>
            <form id="form">
                <input type="text" id="headingInput" placeholder="Write title here....">
                <div class="err"></div>
                <input type="date" id="dateInput" placeholder="set date">
                <button type="submit" id="submit">save</button>
                <button type="button" id='close_btn'>close</button>
                <div id="textarea">
                    <textarea id="taskInput" placeholder="Write task here..."></textarea>
                    <div id="absolute_btns">
                        <button type="button" id='clear_btn' >clear</button>
                    </div>
                </div>
            </form>
        </section>
    `
const bubbleSort_increase=(arr)=>{
    let newArray=[...arr];
    for (let i=0;i<newArray.length;i++)
        for (let j=0;j<newArray;j++){
            const d1 = new Date(newArray[j]);
            const d2 = new Date(newArray[j+1]);
            if (d1>d2){
                const temp = d1;
                d1 = d2;
                d2 = temp;
            }    
        }
}
const bubbleSort_decrease=(arr)=>{
    let newArray=[...arr];
    for (let i=0;i<newArray.length;i++)
        for (let j=0;j<newArray;j++){
            const d1 = new Date(newArray[j]);
            const d2 = new Date(newArray[j+1]);
            if (d1<d2){
                const temp = d1;
                d1 = d2;
                d2 = temp;
            }    
        }
}
export {cardSkeleton, fetchLocalData, putIntoLocalData, newTasks, bubbleSort_increase, bubbleSort_decrease};