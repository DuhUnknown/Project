import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeaderContainer = styled(motion.div)`
  background-color: #222;
  padding: 1rem;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonLink = styled(Link)`
  background-color: #fff;
  color: #222;
  text-decoration: none;
  margin-right: 20px;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: capitalize;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #80606b;
    color: #fff;
  }
`;
interface HeaderProps {
  loggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ loggedIn, onLogout }) => {
  return (
    <HeaderContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NavContainer>
        <ButtonLink to={"/"}>Home</ButtonLink>
        <ButtonLink to={"/cities"}>Cities</ButtonLink>
        {!loggedIn && <ButtonLink to={"/login"}>Login</ButtonLink>}
        {loggedIn && (
          <ButtonLink to={"/"} onClick={onLogout}>
            Log Out
          </ButtonLink>
        )}
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
