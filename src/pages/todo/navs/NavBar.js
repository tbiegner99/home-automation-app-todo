import React from 'react';
import { HeaderNavBar, HomeIcon } from '@tbiegner99/home-automation-components';
import Branding from './Branding';

const NavBar = (props) => (
  <HeaderNavBar>
    <div />

    <Branding />
    <HomeIcon onClick={props.onHomeClick} />
  </HeaderNavBar>
);

export default NavBar;
