import React from 'react';
import combineClasses from 'classnames';

import {
  H2,
  TextArea,
  TextInput,
  Modal,
  Form,
  Button
} from '@tbiegner99/home-automation-components';

import styles from './addListModal.css';

class AddListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboardVisible: false
    };
  }

  handleFocusChange(isFocused) {
    this.setState({ isKeyboardVisible: isFocused });
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
        <H2 className={styles.modalHeader}>Create List</H2>
        <Form onSubmit={onSubmit}>
          <div className={styles.formContent}>
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
export default AddListModal;
