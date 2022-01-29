import React from 'react';
import combineClasses from 'classnames';
import Form from 'reactforms/src/form/Form';
import Button from 'reactforms/src/form/elements/Button';
import HiddenField from 'reactforms/src/form/elements/HiddenField';
import Modal from '../../../../components/elements/modal/Modal';
import { H2 } from '../../../../components/elements/Headers';
import TextInput from '../../../../components/inputs/TextInput';
import TextArea from '../../../../components/inputs/TextArea';

import styles from './addListItemModal.css';

class AddListItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboardVisible: false
    };
  }

  componentDidUpdate() {
    const parentRect = this.refs.form.getBoundingClientRect();
    if (this.state.focusElement) {
      const docTop = this.state.focusElement.getBoundingClientRect().top;
      this.refs.form.scrollTop = Math.max(0, docTop - parentRect.top - 20);
    }
  }

  handleFocusChange(isFocused, evt) {
    this.setState({ isKeyboardVisible: isFocused, focusElement: isFocused ? evt.target : null });
  }

  render() {
    const { onSubmit, onCancel } = this.props;
    const { isKeyboardVisible } = this.state;
    return (
      <Modal
        className={styles.modal}
        modalClassName={combineClasses({
          [styles.onScreenKeyboardVisible]: isKeyboardVisible
        })}
      >
        <H2 className={styles.modalHeader}>Create List Item</H2>
        <Form onSubmit={onSubmit}>
          <HiddenField name="listId" value={this.props.selectedListId} />
          <div className={styles.formContent} ref="form">
            <div className={styles.inputRow}>
              <label htmlFor="name">List Name</label>
              <TextInput
                data-rule-required
                name="name"
                onFocusChange={this.handleFocusChange.bind(this)}
              />
            </div>
            <div className={styles.inputRow}>
              <label htmlFor="description">Description</label>
              <TextArea name="description" onFocusChange={this.handleFocusChange.bind(this)} />
            </div>
            <div className={styles.inputRow}>
              <label htmlFor="estimatedCost">Estimated Cost</label>
              <TextInput name="estimatedCost" onFocusChange={this.handleFocusChange.bind(this)} />
            </div>
            <div className={styles.inputRow}>
              <label htmlFor="whereToBuy">Store Name</label>
              <TextInput name="whereToBuy" onFocusChange={this.handleFocusChange.bind(this)} />
            </div>
            <div className={styles.inputRow}>
              <label htmlFor="link">Link</label>
              <TextInput name="link" onFocusChange={this.handleFocusChange.bind(this)} />
            </div>
            <div className={styles.inputRow}>
              <label htmlFor="notes">Notes</label>
              <TextArea name="notes" onFocusChange={this.handleFocusChange.bind(this)} />
            </div>
          </div>

          <div className={styles.buttonRow}>
            <Button submittable>Submit</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </Form>
      </Modal>
    );
  }
}
export default AddListItemModal;
