import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: brightness(0.75);
  transition: all 0.3s ease-in-out;
`;

export const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 260px;
  background-color: white;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  z-index: 50;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 0 rem;
`;

export const LogoWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const Logo = styled.img`
  width: 170px;
  height: auto;
  display: block;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-left: 2rem;
  font-size: 1.35rem;
`;

export const AuthList = styled.ul`
  padding: 38rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-self: flex-start;
  font-size: 1.05rem;
`;

export const StyledLink = styled(RouterLink)`
  color: ${({ $active }) => ($active ? "#3B82F6" : "#4B5563")};
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #3b82f6;
  }
`;
