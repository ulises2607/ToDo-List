import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TaskStorage } from './functions.js';

const storage = new TaskStorage();
storage.addTask();
// Llama al método loadData de la instancia storage
window.onload = () => {
  storage.loadData();
};