import { useValidation, useLocalStorage, renderNotes, handleZeroNotes } from "./utils.js";

document.addEventListener("DOMContentLoaded",()=>{

    const titleDom = document.querySelector("#note-title");
    const notesDom = document.querySelector("#note-content");
    const heading = document.querySelector(".notes-heading");

    const { addData, getNote, deleteElement } = useLocalStorage();

    const params = new URLSearchParams(window.location.search);

    if (params.get("work")==="update-note"){
        const id = params.get("id");
        getNote(id, titleDom, notesDom);
        heading.textContent="Read / Update Notes"
    }else{
        heading.textContent="Create a Note"
    }

    renderNotes()

    document.querySelector("#saveNoteBtn").addEventListener("click",()=>{
        if (useValidation(titleDom, notesDom)){

            let element = { name: titleDom.value, notes: notesDom.value };

            if (params.get("work")==="update-note"){
                const id = params.get("id");
                deleteElement(id)
            }

            addData(element)

            renderNotes()

            titleDom.value="";
            notesDom.value="";

        }else{
            return;
        }
    })
})