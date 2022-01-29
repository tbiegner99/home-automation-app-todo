import React from 'react';
import { HeaderNavBar } from '../../../components/menus/HeaderNav';
import Branding from './Branding';
import { HomeIcon } from '../../../components/icons/Icons';

const NavBar = (props) => (
  <HeaderNavBar>
    <div />

    <Branding />
    <HomeIcon onClick={props.onHomeClick} />
  </HeaderNavBar>
);

export default NavBar;
