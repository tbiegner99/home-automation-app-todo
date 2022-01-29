import React from 'react';

import { H3 } from '../../../components/elements/Headers';
import { AddIcon } from '../../../components/icons/Icons';

import styles from './listPaneHeader.css';

const ListPaneHeader = (props) => (
  <div className={styles.header}>
    <H3 className={styles.title}>{props.children}</H3>
    <AddIcon onClick={props.onAdd} />
  </div>
);

export default ListPaneHeader;
