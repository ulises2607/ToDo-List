import _ from 'lodash';
import './style.css';
import "@fortawesome/fontawesome-free/css/all.css";

const taskList = document.querySelector('.task-list')

class taskStorage{
  data = []

  addData(t){
    console.log('AddData');
    if(this.data.length >= 1) {
      t.index = this.data.length 
    }
    this.data.push(t)
    this.saveData();
  }

  removeData(id) {
    this.data = this.data.filter((task) => task.id !== id);
    this.saveData();
    this.displayData();
  }

  createTask(desc, comp=false, ind=0) {
    console.log('createD');
    const task = {
      index: ind,
      description: desc,
      completed: comp,
    };
    this.addData(task);
  }

  displayData() {
    taskList.innerHTML= '';
    for(let id = 0; id < this.data.length ; id++){
            taskList.innerHTML += `
            <li class="list-item">
                
                  <div class="check-desc">
                    <input class='checkbox' type='checkbox' ${this.data[id].completed ? 'checked' : ''}>
                    <p>${this.data[id].description} </p>
                  </div>
                  
                  <i class="fa-solid fa-ellipsis-vertical"></i>
              
            </li>
      `;    
    }
    
  }

  saveData() {
      localStorage.setItem('tasks', JSON.stringify(this.data));
    console.log('saveData');
  }

  loadData() {
    const savedData = localStorage.getItem('tasks');
    if (savedData) {
      this.data = JSON.parse(savedData);
    }
    this.displayData()
  }
}

  let storage = new taskStorage();



const list = document.querySelector('.add-form')


export const addTask = (taskSt) => {
  list.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskDesc = document.querySelector('#input-task');
    taskSt.createTask(taskDesc.value);
    taskSt.displayData()
  });
};

addTask(storage);

window.onload = storage.loadData();