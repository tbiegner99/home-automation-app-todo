import { AbstractReducingStore, StoreField } from '@tbiegner99/ui-app-components';
import ToDoEvents from '../../events/ToDoEvents';
import ToDoActionCreator from '../../actionCreators/ToDoActionCreator';
class ToDoListStore extends AbstractReducingStore {
  constructor() {
    super();
    this.data = {
      lists: new StoreField('lists', null, this.loadLists.bind(this)),
      selectedList: new StoreField('selectedList', null, null),
      selectedListItems: new StoreField(
        'selectedListItems',
        null,
        this.loadSelectedListItems.bind(this)
      )
    };
  }

  async loadLists() {
    try {
      return await ToDoActionCreator.loadLists();
    } catch (err) {
      return null;
    }
  }

  async loadSelectedListItems() {
    try {
      const selectedList = this.data.selectedList.value;
      if (!selectedList) {
        return null;
      }

      return await ToDoActionCreator.loadItemsForList(selectedList.listId);
    } catch (err) {
      return null;
    }
  }

  get lists() {
    return this.data.lists;
  }

  get selectedList() {
    return this.data.selectedList;
  }

  get selectedListItems() {
    return this.data.selectedListItems;
  }

  handleEvent(action) {
    switch (action.type) {
      case ToDoEvents.LIST_ITEM_DELETED:
        this.loadSelectedListItems();
        break;
      case ToDoEvents.LIST_DELETED:
        if (this.data.selectedList.value.listId === action.data.listId) {
          this.data.selectedList.value = null;
          this.data.selectedListItems.value = null;
        }
        this.loadLists();
        break;
      case ToDoEvents.LIST_LOADED:
        this.data.lists.value = action.data.lists;
        break;
      case ToDoEvents.SELECTED_LIST_CHANGED:
        this.data.selectedList.value = action.data.selectedList;
        this.loadSelectedListItems();
        break;
      case ToDoEvents.LIST_ITEMS_LOADED:
        this.data.selectedListItems.value = action.data;
        break;
      case ToDoEvents.LIST_CREATED: {
        this.data.selectedList.value = action.data.list;
        this.data.selectedListItems.value = [];
        this.loadLists();
        break;
      }
      default:
        return false;
    }
    return true;
  }
}

export default new ToDoListStore();
