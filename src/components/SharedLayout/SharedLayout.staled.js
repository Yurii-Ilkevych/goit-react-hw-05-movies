import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom';

 const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid black;

  > nav {
    display: flex;
  }
`;

const Link = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;
  &:hover {
    color: rgb(99, 18, 18);
  }
  &.active {
    color: white;
    background-color: green;
  }

`;

export {Header, Link}
