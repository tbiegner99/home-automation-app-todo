import React from 'react';

import { H3, AddIcon } from '@tbiegner99/home-automation-components';

import styles from './listPaneHeader.css';

const ListPaneHeader = (props) => (
  <div className={styles.header}>
    <H3 className={styles.title}>{props.children}</H3>
    <AddIcon onClick={props.onAdd} />
  </div>
);

export default ListPaneHeader;
