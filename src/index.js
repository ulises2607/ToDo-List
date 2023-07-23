import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TaskStorage, addTask } from './functions.js';

const storage = new TaskStorage();
export default storage;

addTask(storage);

window.onload = storage.loadData();