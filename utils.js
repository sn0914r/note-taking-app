//table-utiles
const useTableRow=(serialNo, name)=>{
    const element = 
            `
            <tr id=${name.replaceAll(" ","-")} >
            <td>${serialNo}</td>
            <td>${name}</td>
            <td><button onclick="deleteNote(this)" class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button></td>
            <td><button onclick="editNote(this)" class="btn btn-sm btn-success"><i class="bi bi-pencil-square"></i></button></td>
            `
    return element;
}

const handleZeroNotes=msg=>{
    const element = 
            `
            <tr class="text-center p-2 text-uppercase" >
                <td colspan="4" >${msg}</td>
            </tr>
            `
    return element;
}

// localstorage

const useLocalStorage=()=>{
    const key = "note-taking-appp"
    const getData=()=>{
        return window.localStorage.getItem(key)? JSON.parse(window.localStorage.getItem(key)):[]
    };
    const addData=elemnt=>{
        const data = getData();
        data.push(elemnt);
        window.localStorage.setItem(key, JSON.stringify(data))
    }
    const clearData=()=>window.localStorage.removeItem(key);
    const deleteElement=id=>{
        const data = getData();
        const filteredData = data.filter(e=>{
            return e.name.replaceAll(" ","-")!==id
        })
        window.localStorage.setItem(key, JSON.stringify(filteredData))
        
    }
    const getNote=(id, titleDom, NoteDom)=>{
        const data = getData();
        let target = data.filter(e=>{
            return e.name.replaceAll(" ","-")===id
        })
        target = target[0];
        titleDom.value = target.name;
        NoteDom.value = target.notes;
        // deleteElement(id);
    } 
    return ({
        addData, getData, clearData, deleteElement, getNote
    })
}

const { getData, deleteElement } = useLocalStorage();

//form-validation
const validationHoc=()=>{
    const msgDom = document.querySelector(".message-box");
    const alertDiv = (msg, isGood) => 
        `<div class="alert ${isGood ? 'alert-success' : 'alert-danger'} alert-dismissible fade show" role="alert">
            ${msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;       
    const setMsg=(msg, isGood=false)=>{
        msgDom.innerHTML = alertDiv(msg, isGood);
    }
    return function(titleDom,notesDom){
        if (titleDom.value.trim()===""){
            setMsg("the title cannot be empty.")
            return false;
        }
        if (notesDom.value.trim()===""){
            setMsg("notes cannot be empty")
            return false;
        }
        setMsg("notes saved successfully", true)
        return true
    }
    
}

const useValidation = validationHoc();

//render Notes
const renderNotes=(list=false, msg=false)=>{
    const tbodyRef = document.querySelector("tbody")
    tbodyRef.innerHTML="";
    let data = list? list: getData();
    if (data.length===0){
        tbodyRef.innerHTML= handleZeroNotes(msg?msg:"You didn't write any notes.")
    }
    let dataElements = data.map((e, i)=>useTableRow(i+1,e.name));
    dataElements.forEach(e=>tbodyRef.innerHTML+=e);
}

// window functions
const deleteNote=(dom)=>{
    const id = dom.parentElement.parentElement.id 
    deleteElement(id)
    renderNotes();
}

const editNote=(dom)=>{
    const id = dom.parentElement.parentElement.id;
    window.location.href = `note.html?work=update-note&id=${id}`
}

window.editNote = editNote;
window.deleteNote = deleteNote;


export { useTableRow, useLocalStorage, useValidation, renderNotes, handleZeroNotes };