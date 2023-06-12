//! SELECTORS
const inputAdd = document.getElementById("input-add");
const btnAdd = document.getElementById("btn-add");

const formAdd = document.getElementById("form-add");
const taskBody = document.getElementById("taskBody");


//! VARIABLES
//? tüm todo ları locakStroage de saklar.
let todos = [];



//! EVENTS


//? add
formAdd.addEventListener ("submit", (e) =>  {
    e.preventDefault()  
    
    const task={
        id:new Date().getTime(),
        text:inputAdd.value,
        done:false
    }

    todos.push(task)

    //? localstorage veriyi gönder
    localStorage.setItem('todo', JSON.stringify(todos))

    sendToDom(task)
    formAdd.reset()
    inputAdd.focus()
     
})

//? sayfa yüklendikten sonra çalışır
window.addEventListener('load',()=>{
    currentDay()

    todos = JSON.parse(localStorage.getItem('todo')) || [];
    todos.forEach((veri_)=> sendToDom(veri_))

})


//? delete
taskBody.addEventListener ("click", (e) => {
    e.preventDefault() 

    if (e.target.classList.contains("btn")){
        e.target.parentElement.remove()
    }

    const id = e.target.id
    console.log(id)

    todos = todos.filter((veri) => veri.id != id)
    
    localStorage.setItem('todo', JSON.stringify(todos))

    // sendToDom()
    
});



//! FUNCTIONS

const sendToDom = ({id,text})=>{

    taskBody.innerHTML += `

    <div class="d-flex gap-2 mb-2">

        <input id="" class="form-control p-3" disabled value="${text}">
        
        <button id="${id}" type="submit" class="btn btn-danger p-3"><i class="fa-solid fa-trash-can"></i></button>

    </div>
    `

};


const currentDay = () => {
//! tarihin otomatik olarak değişmesi
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    const today = new Date().getDay();
    console.log(today)
    document.getElementById("day").innerText = `${days[today]} ☕`
}

// {/* <div id="todo-div" class="d-flex gap-2 mb-2 todo1">
//         <input id="todo-input" class="form-control p-3" type="text" value="${text}" />
//         <button id="${id}" class="btn btn-danger p-3 "><i class="fa-solid fa-trash-can"></i>
//         </button>
//     </div> */}