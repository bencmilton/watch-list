import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavbarLink = styled(NavLink)`
  color: white;
  display: block;
  margin: 10px;
  font-family: Helvetica, Arial, sans-serif;
  text-decoration: none;
  padding: 15px 5px;

  &:hover {
    text-decoration: underline;
  }
`;

export default NavbarLink;
