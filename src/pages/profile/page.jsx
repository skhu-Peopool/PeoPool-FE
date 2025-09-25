import React, { useState } from "react";
import {
  User,
  UserCircle2,
  Users,
  Activity as ActivityIcon,
} from "lucide-react";
import styled, { keyframes } from "styled-components";
import Profile from "../../components/Profile";
import Management from '../management/page'
import Activity from "../../components/Activity";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  padding: 2rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
    animation: ${float} 6s ease-in-out infinite;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const HeaderContent = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  font-weight: 300;
`;

const SubMenu = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
  gap: 0.5rem;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`;

const SubMenuContent = styled.button`
  flex: 1;
  border-radius: 1.5rem;
  padding: 1rem 1.5rem;
  background: ${props => props.active ? 
    'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))' : 
    'transparent'
  };
  border: ${props => props.active ? 
    '1px solid rgba(255, 255, 255, 0.3)' : 
    '1px solid transparent'
  };
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
  font-weight: ${props => props.active ? '700' : '500'};
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-shadow: ${props => props.active ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none'};
  box-shadow: ${props => props.active ? 
    '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 
    'none'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.25))' : 
      'rgba(255, 255, 255, 0.15)'
    };
    transform: translateY(-1px);
    color: #ffffff;
    box-shadow: ${props => props.active ? 
      '0 6px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)' : 
      '0 2px 8px rgba(0, 0, 0, 0.1)'
    };

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    transition: transform 0.1s ease;
  }
`;

const ProfileEditPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'management':
        return <Management />;
      case 'activity':
        return <Activity />;
      default:
        return <Profile />;
    }
  };
  
  return (
    <Container>
      <ContentWrapper>
        <Header>
          <HeaderContent>
            <TitleWrapper>
              <User color="white" size={40} />
              <Title>Profile</Title>
            </TitleWrapper>
            <Subtitle>나만의 프로필을 관리하고 활동을 확인해보세요</Subtitle>
          </HeaderContent>
        </Header>
        <SubMenu>
          <SubMenuContent 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          >
            <UserCircle2 size={20} />
            내 프로필
          </SubMenuContent>
          <SubMenuContent 
            active={activeTab === 'management'} 
            onClick={() => setActiveTab('management')}
          >
            <Users size={20} />
            신청자 관리
          </SubMenuContent>
          <SubMenuContent 
            active={activeTab === 'activity'} 
            onClick={() => setActiveTab('activity')}
          >
            <ActivityIcon size={20} />
            내 활동
          </SubMenuContent>
        </SubMenu>
        {renderContent()}
      </ContentWrapper>
    </Container>
  );
};

export default ProfileEditPage;