import { combineReducers } from 'redux';
import ToDoListStore from '../stores/todo/ToDoListStore';

export default combineReducers({
  todo: ToDoListStore.reduce,
});
