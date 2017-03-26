import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavbarLink = styled(NavLink)`
  color: palevioletred;
  display: block;
  margin: 0.5em 0;
  font-family: Helvetica, Arial, sans-serif;
  text-decoration: none;
  padding: 15px 5px;

  &:hover {
    text-decoration: underline;
  }
`;

export default NavbarLink;
