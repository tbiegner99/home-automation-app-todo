import React from 'react';
import { HeaderNav, HomeIcon } from '@tbiegner99/home-automation-components';
import Branding from './Branding';

const NavBar = (props) => (
  <HeaderNav>
    <div />

    <Branding />
    <HomeIcon onClick={props.onHomeClick} />
  </HeaderNav>
);

export default NavBar;
