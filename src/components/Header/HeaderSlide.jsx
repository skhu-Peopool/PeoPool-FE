import React from "react";
import { Calendar, UserSearch, Users, } from 'lucide-react';
import styled from 'styled-components';


const Sidebar = styled.div`
  width: 17.5rem;
  background: linear-gradient(135deg, #8BB3EA 0%, #6B9DE4 100%);
  color: white;
  padding: 1.5rem;
  overflow-y: auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MenuText = styled.span`
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
`;

const MenuBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
`;



const UserProfile = styled.div`
  position: absolute;
  width: 14.5rem;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: white;
  color: #73a3e7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserNameProfile = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.125rem;
`;

const HeaderSlide = () => {
  return(
     <Sidebar>
        <Logo>
          <LogoIcon>
            <Users size={18} />
          </LogoIcon>
          peopool
        </Logo>
        
        
        <MenuItem active>
          <Users size={18} />
          <MenuText>Community</MenuText>
          <MenuBadge>0</MenuBadge>
        </MenuItem>
        <MenuItem>
          <UserSearch size={18} />
          <MenuText>사람찾기</MenuText>
          <MenuBadge>2</MenuBadge>
        </MenuItem>
        <MenuItem>
          <Calendar size={18} />
          <MenuText>달력/시간표</MenuText>
          <MenuBadge>1</MenuBadge>
        </MenuItem>
        
        <UserProfile>
          <UserAvatar>JW</UserAvatar>
          <UserDetails>
            <UserNameProfile>John W.</UserNameProfile>
          </UserDetails>
        </UserProfile>
      </Sidebar>
  )
}

export default HeaderSlide;