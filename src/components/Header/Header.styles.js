import styled from "styled-components";
import { Link } from "react-router-dom";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

export const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: #F8FBFF;
  transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const LogoWrapper = styled.div`
  margin-bottom: 40px;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  display: block;
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  
  li {
    margin-bottom: 8px;
  }
`;

export const AuthList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: auto;
  
  li {
    margin-bottom: 8px;
  }
`;

export const StyledLink = styled(Link)`
  display: block;
  padding: 12px 16px;
  color: ${(props) => (props.$active ? "#fff" : "#666")};
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  background: ${(props) => {
    if (props.$highlight) return "linear-gradient(135deg, #9ABEEC, #7BA8E0)";
    if (props.$active) return "linear-gradient(135deg, #9ABEEC, #7BA8E0)";
    return "transparent";
  }};
  
  &:hover {
    background: ${(props) => {
      if (props.$highlight) return "linear-gradient(135deg, #8BB0E8, #6A9ADC)";
      if (props.$active) return "linear-gradient(135deg, #8BB0E8, #6A9ADC)";
      return "#e9ecef";
    }};
    color: ${(props) => (props.$active || props.$highlight ? "#fff" : "#333")};
  }
  
  
  ${(props) => props.$small && `
    font-size: 14px;
    padding: 8px 16px;
  `}
`;