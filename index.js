import { useLocalStorage, renderNotes } from "./utils.js";

document.addEventListener("DOMContentLoaded",()=>{
    const { clearData, getData } = useLocalStorage();
    document.querySelector("#clearNotes").addEventListener("click",()=>{
        const response = confirm("Do you want to delete all notes??");
        response && clearData();
        renderNotes()
    })

    renderNotes();

    document.querySelector("#input").addEventListener("input",(e)=>{
        let input = e.target.value.trim().toLowerCase();
        const data = getData()
        let filter = data.filter(e=>e.name.trim().toLowerCase().includes(input))
        renderNotes(filter, input!=="" && "No notes available")
    })

})