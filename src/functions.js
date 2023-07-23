const list = document.querySelector('.add-form');
const taskList = document.querySelector('.task-list');
import storage from ".";

export class TaskStorage {
  data = [];

  addData(t) {
    if (this.data.length > 0) {
      const maxIndex = Math.max(...this.data.map((task) => task.index));
      t.index = maxIndex + 1;
    } else {
      t.index = 0; // Si no hay elementos en el array, el índice será 1
    }
    this.data.push(t);
    this.saveData();
  }

  removeData(id) {
    this.data = this.data.filter((task) => task.index !== id);
    this.saveData();
    this.rearray()
    this.displayData();
    
  }

  createTask(desc, comp = false, ind = 0) {
    const task = {
      index: ind,
      description: desc,
      completed: comp,
    };
    this.addData(task);
  }

  rearray() {
    this.data.forEach((dat, index) => {
      dat.index = index;
    });
    console.log(this.data);
    this.saveData();
  }

  displayData() {
    this.rearray()
    taskList.innerHTML = '';
    for (let id = 0; id < this.data.length; id += 1) {
      taskList.innerHTML += `
            <li class="list-item" data-task-id="${this.data[id].index}">
                
                  <div class="check-desc">
                    <input class='checkbox' type='checkbox' ${this.data[id].completed ? 'checked' : ''}>
                    <p>${this.data[id].description} </p>
                  </div>
                  <div class="del-mod">
                  <a class="points">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </a>
                  </div>
                  
              
            </li>
      `;
          const items = document.querySelectorAll('.list-item');
        items.forEach((li) => {

        const paragraph = li.querySelector('p')
        const iconOpt = li.querySelector('.fa-ellipsis-vertical');

        iconOpt.addEventListener('click', (event) => {
          paragraph.contentEditable = true
          paragraph.focus()
          paragraph.addEventListener('keydown',(event) => {
            if(event.key === 'Enter') {
              const taskId = parseInt(li.dataset.taskId)
              const newParaph = paragraph.textContent.trim()
              console.log(newParaph);
              const taskToUpdate = storage.data.find((task) => task.index === taskId);
              if (taskToUpdate) {
                taskToUpdate.description = newParaph;
                storage.saveData();
                storage.displayData();
              }
            }
  
          })
          
          event.stopPropagation();
          iconOpt.classList.replace('fa-ellipsis-vertical', 'fa-trash-can');
          
          li.style.backgroundColor = '#FFF9C4';

          const trashIcon = li.querySelector('.fa-trash-can');
          trashIcon.addEventListener('click', () => {
            
            const taskId = parseInt(li.dataset.taskId)
            storage.removeData(taskId)
            storage.rearray()
          

          } )
        });
      });    
    }  
  }

  saveData() {
    localStorage.setItem('tasks', JSON.stringify(this.data));
  }

  loadData() {
    const savedData = localStorage.getItem('tasks');
    if (savedData) {
      this.data = JSON.parse(savedData);
    }
    this.displayData();
  }
}

export const addTask = (taskSt) => {
    list.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskDesc = document.querySelector('#input-task');
        taskSt.createTask(taskDesc.value);
        taskSt.displayData();
        });
    };



