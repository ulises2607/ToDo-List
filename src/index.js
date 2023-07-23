import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TaskStorage } from './functions.js';

const list = document.querySelector('.add-form');
const taskList = document.querySelector('.task-list');
const storage = new TaskStorage();

storage.addTask();

window.onload = storage.loadData();