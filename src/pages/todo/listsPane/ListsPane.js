import React from 'react';

import combineClasses from 'classnames';
import List from '../../../components/elements/list/List';
import ListItem from '../../../components/elements/list/ListItem';
import styles from './listsPane.css';
import ListPaneHeader from '../listPaneHeader/ListPaneHeader';
import AddListModal from './addModal/AddListModal';
import ConfirmDialog from '../../../components/dialogs/ConfirmDialog';
import ListItemPlaceHolder from '../../../components/elements/list/PlaceHolderListItem';

class ListsPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateModal: false,
      showDeleteModal: false,
      deleteItem: null
    };
  }

  async submitForm(list) {
    try {
      await this.props.onCreateList(list);
      this.setState({ showCreateModal: false });
    } catch (err) {
      console.error(err);
    }
  }

  cancelDelete() {
    this.setState({ deleteList: null, showDeleteModal: false });
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

  renderDeleteModal() {
    const { deleteItem } = this.state;
    return (
      <ConfirmDialog
        title="Confirm Delete"
        prompt={`Are you sure you want to delete the list "${deleteItem.name}"`}
        onConfirm={() => this.deleteConfirmed(deleteItem)}
        onCancel={() => this.cancelDelete()}
      />
    );
  }

  renderCreateModal() {
    return (
      <AddListModal
        onSubmit={this.submitForm.bind(this)}
        onCancel={() => this.setState({ showCreateModal: false })}
      />
    );
  }

  renderModal() {
    const { showDeleteModal, showCreateModal } = this.state;
    if (showDeleteModal) {
      return this.renderDeleteModal();
    } else if (showCreateModal) {
      return this.renderCreateModal();
    }
    return null;
  }

  renderItems(items) {
    const { onListSelect } = this.props;
    if (!items.length) {
      return <ListItemPlaceHolder title="No lists to display" />;
    }
    return items.map((item) => (
      <ListItem
        title={item.name}
        subtitle={item.description}
        onClick={() => onListSelect(item)}
        onDelete={() => this.confirmDelete(item)}
      />
    ));
  }

  render() {
    const { items, className } = this.props;
    if (!items) {
      return null;
    }

    return (
      <div className={combineClasses(className, styles.listsPane)}>
        <ListPaneHeader onAdd={() => this.setState({ showCreateModal: true })}>
          To Do Lists
        </ListPaneHeader>
        <List className={styles.lists}>{this.renderItems(items)}</List>
        {this.renderModal()}
      </div>
    );
  }
}

export default ListsPane;
