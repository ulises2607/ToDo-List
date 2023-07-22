import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';

const taskList = document.querySelector('.task-list');

class TaskStorage {
  data = [
    {
      index: 1,
      description: "Buy groceries",
      completed: false,
    },
    {
      index: 2,
      description: "Pay bills",
      completed: true,
    },
    {
      index: 3,
      description: "Call the doctor",
      completed: false,
    },
    {
      index: 4,
      description: "Organize the closet",
      completed: true,
    },
  ];

  addData(t) {
    if (this.data.length >= 1) {
      t.index = this.data.length;
    }
    this.data.push(t);
    this.saveData();
  }

  removeData(id) {
    this.data = this.data.filter((task) => task.id !== id);
    this.saveData();
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

  displayData() {
    taskList.innerHTML = '';
    for (let id = 0; id < this.data.length; id += 1) {
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
  }

  loadData() {
    const savedData = localStorage.getItem('tasks');
    if (savedData) {
      this.data = JSON.parse(savedData);
    }
    this.displayData();
  }
}

const storage = new TaskStorage();

const list = document.querySelector('.add-form');

const addTask = (taskSt) => {
  list.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskDesc = document.querySelector('#input-task');
    taskSt.createTask(taskDesc.value);
    taskSt.displayData();
  });
};

addTask(storage);

window.onload = storage.loadData();