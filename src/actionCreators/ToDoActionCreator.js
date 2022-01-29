import { BaseActionCreator } from '@tbiegner99/ui-app-components';

import ToDoListDatasource from '../datasource/ToDoListDatasource';
import ToDoEvents from '../../events/ToDoEvents';

class ToDoActionCreator extends BaseActionCreator {
  async createList(list) {
    try {
      const result = await ToDoListDatasource.createList(list);
      this.dispatch({ type: ToDoEvents.LIST_CREATED, data: { list: result } });
    } catch (error) {
      this.dispatch({ type: ToDoEvents.Errors.LIST_CREATE_ERROR, data: { error } });
      throw error;
    }
  }

  async deleteList(listId) {
    try {
      await ToDoListDatasource.deleteList(listId);
      this.dispatch({ type: ToDoEvents.LIST_DELETED, data: { listId } });
    } catch (error) {
      this.dispatch({ type: ToDoEvents.Errors.LIST_DELETE_ERROR, data: { error } });
      throw error;
    }
  }

  async loadLists() {
    try {
      const results = await ToDoListDatasource.getAllLists();
      this.dispatch({ type: ToDoEvents.LIST_LOADED, data: { lists: results } });
    } catch (error) {
      this.dispatch({ type: ToDoEvents.Errors.LIST_LOAD_ERROR, data: { error } });
      throw error;
    }
  }

  async loadItemsForList(listId) {
    try {
      const results = await ToDoListDatasource.getListItems(listId);
      this.dispatch({ type: ToDoEvents.LIST_ITEMS_LOADED, data: results });
    } catch (error) {
      this.dispatch({ type: ToDoEvents.Errors.LIST_ITEMS_LOAD_ERROR, data: { error } });
      throw error;
    }
  }

  async createItem(listId, listItem) {
    try {
      const result = await ToDoListDatasource.createItem(listId, listItem);
      this.dispatch({ type: ToDoEvents.LIST_ITEM_CREATED, data: result });
    } catch (error) {
      this.dispatch({ type: ToDoEvents.Errors.LIST_ITEM_CREATE_ERROR, data: { error } });
      throw error;
    }
  }

  async deleteItem(listId, listItemId) {
    try {
      const result = await ToDoListDatasource.deleteItem(listId, listItemId);
      this.dispatch({ type: ToDoEvents.LIST_ITEM_DELETED, data: result });
    } catch (error) {
      this.dispatch({ type: ToDoEvents.Errors.LIST_ITEM_DELETE_ERROR, data: { error } });
      throw error;
    }
  }

  changeSelectedList(list) {
    this.dispatch({ type: ToDoEvents.SELECTED_LIST_CHANGED, data: { selectedList: list } });
  }
}
export default new ToDoActionCreator();
