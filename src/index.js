import { every } from 'lodash';
import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { addTask, TaskStorage} from './functions';






const storage = new TaskStorage();
export default storage

addTask(storage);



window.onload = storage.loadData();