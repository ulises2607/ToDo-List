const list = document.querySelector('.add-form');
const items = document.querySelectorAll('.list-item')


export const addTask = (taskSt) => {
    list.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskDesc = document.querySelector('#input-task');
        taskSt.createTask(taskDesc.value);
        taskSt.displayData();
        });
    };



