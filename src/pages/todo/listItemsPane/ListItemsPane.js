import React from 'react';

import combineClasses from 'classnames';
import {
  List,
  ListItem,
  ConfirmDialog,
  PlaceHolderListItem as ListItemPlaceHolder
} from '@tbiegner99/home-automation-components';
import ListPaneHeader from '../listPaneHeader/ListPaneHeader';
import AddListItemModal from './addModal/AddListItemModal';

import styles from './listItemsPane.css';

class ListItemsPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showAddModal: false };
  }

  async submitForm(item) {
    try {
      await this.props.onCreateListItem(item);
      this.setState({ showAddModal: false, showDeleteModal: false, deleteItem: null });
    } catch (err) {
      console.error(err);
    }
  }

  cancelDelete() {
    this.setState({ deleteItem: null, showDeleteModal: false });
  }

  deleteConfirmed(list) {
    const { onDelete } = this.props;
    if (typeof onDelete === 'function') {
      onDelete(list);
    }
    this.setState({ deleteItem: null, showDeleteModal: false });
  }

  confirmDelete(item) {
    this.setState({ deleteItem: item, showDeleteModal: true });
  }

  renderAddModal() {
    const { selectedList } = this.props;
    if (!this.state.showAddModal) {
      return null;
    }
    return (
      <AddListItemModal
        selectedListId={selectedList.listId}
        onSubmit={this.submitForm.bind(this)}
        onCancel={() => this.setState({ showAddModal: false })}
      />
    );
  }

  renderDeleteModal() {
    const { deleteItem, showDeleteModal } = this.state;
    if (!showDeleteModal) {
      return null;
    }
    return (
      <ConfirmDialog
        title="Confirm Delete"
        prompt={`Are you sure you want to delete the list "${deleteItem.name}"`}
        onConfirm={() => this.deleteConfirmed(deleteItem)}
        onCancel={() => this.cancelDelete()}
      />
    );
  }

  renderItems() {
    const { onItemSelect, items } = this.props;
    if (!items.length) {
      return <ListItemPlaceHolder title="No Items in this list" />;
    }
    const toRenderedListItem = (item) => (
      <ListItem
        title={item.name}
        subtitle={item.description}
        onDelete={() => this.confirmDelete(item)}
        onClick={() => onItemSelect(item)}
      />
    );

    return items.map(toRenderedListItem);
  }

  render() {
    const { className, selectedList, items } = this.props;
    if (!selectedList || !items) {
      return null;
    }

    return (
      <div className={combineClasses(className, styles.listItemsPane)}>
        <ListPaneHeader onAdd={() => this.setState({ showAddModal: true })}>
          {selectedList.name}
        </ListPaneHeader>
        <List className={styles.lists}>{this.renderItems()}</List>
        {this.renderAddModal()}
        {this.renderDeleteModal()}
      </div>
    );
  }
}

export default ListItemsPane;
