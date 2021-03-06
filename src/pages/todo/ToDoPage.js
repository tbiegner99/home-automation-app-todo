import React from 'react';
import { connect } from 'react-redux';
import { H3, CurrentTime } from '@tbiegner99/home-automation-components';
import ToDoActionCreator from '../../actionCreators/ToDoActionCreator';
import ListsPane from './listsPane/ListsPane';
import ListItemsPane from './listItemsPane/ListItemsPane';
import styles from './toDoPage.css';

const ToDoPage = (props) => {
  const {
    onCreateList,
    onCreateListItem,
    onDeleteItem,
    onDeleteList,
    lists,
    onListChanged,
    selectedList,
    currentListItems
  } = props;
  return (
    <div className={styles.page}>
      <div className={styles.pageContent}>
        <H3 className={styles.time}>
          <CurrentTime format="dddd MMMM D YYYY" />
          <CurrentTime format="hh:mma" />
        </H3>
        <section className={styles.toDoContent}>
          <ListsPane
            onCreateList={onCreateList}
            className={styles.listsPane}
            items={lists}
            onListSelect={onListChanged}
            onDelete={onDeleteList}
          />
          <ListItemsPane
            onCreateListItem={onCreateListItem}
            className={styles.listItemsPane}
            items={currentListItems}
            onDelete={onDeleteItem}
            selectedList={selectedList}
          />
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lists: state.todo.store.lists.value,
  selectedList: state.todo.store.selectedList.value,
  currentListItems: state.todo.store.selectedListItems.value
});

const mapDispatchToProps = () => ({
  onCreateList(list) {
    return ToDoActionCreator.createList(list);
  },
  onCreateListItem(item) {
    return ToDoActionCreator.createItem(item.listId, item);
  },
  onDeleteItem(item) {
    return ToDoActionCreator.deleteItem(item.listId, item.listItemId);
  },
  onDeleteList(list) {
    return ToDoActionCreator.deleteList(list.listId);
  },
  onListChanged(list) {
    ToDoActionCreator.changeSelectedList(list);
  },
  onLoadListItems: (listId) => {
    ToDoActionCreator.loadItemsForList(listId);
  },
  onChangeUrl: (url) => {
    ToDoActionCreator.changeUrl(url);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoPage);
