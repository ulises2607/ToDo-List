import _ from 'lodash';
import './style.css';
import "@fortawesome/fontawesome-free/css/all.css";

const taskList = document.querySelector('.task-list')

class taskStorage{
  data = []

  addData(t){
    this.data.push(t)
    this.saveData();
  }

  removeData(id) {
    this.data = this.data.filter((book) => book.id !== id);
    this.saveData();
    this.displayData();
  }

  createTask(desc, comp=false, ind=0) {
    const task = {
      index: ind,
      description: desc,
      complete: comp,
    };
    this.addData(task);
  }

  displayData() {
    let indexTask = 0;
    taskList.innerHTML= '';
    this.data.forEach((elem) => {
      taskList.innerHTML += `
      <li class="list-item">
          <p>
            <input class='checkbox' type='checkbox' ${task.completed ? 'checked' : ''}>
            ${task.description}
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </p>
      </li>
`;
    })
    indexTask += 1;
  }

  saveData() {
    localStorage.setItem('tasks', JSON.stringify(this.data));
  }

  loadData() {
    const savedData = localStorage.getItem('tasks');
    if (savedData) {
      this.data = JSON.parse(savedData);
    }
  }

}

  let storage = new taskStorage();



const list = document.querySelector('.add-form')


export const addTask = (taskSt) => {
  list.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskDesc = document.querySelector('#input-task');

    taskSt.createTask(taskDesc);
    taskSt.displayData();
  });
};

addTask(storage);