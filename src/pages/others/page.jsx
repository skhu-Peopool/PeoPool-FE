import React, { useState } from 'react';
import { Users, MessageCircle, Star, MapPin, Clock } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

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
  padding: 2rem 1rem;
  position: relative;
  
  &::before {
    content: '';
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
  margin-bottom: 1rem;
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
  margin-bottom: 1.5rem;
`;

const SearchResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  animation: ${fadeIn} 1s ease-out 0.2s both;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2rem;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #60a5fa, #3b82f6, #93c5fd);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const ContactButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(96, 165, 250, 0.4);

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 30px rgba(96, 165, 250, 0.6);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  box-shadow: 0 4px 20px rgba(96, 165, 250, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #60a5fa, #3b82f6, #93c5fd);
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${Card}:hover &::after {
    opacity: 1;
  }
`;

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  background: #10b981;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
`;

const Role = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  color: #9ca3af;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  color: #4338ca;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(135deg, #c7d2fe, #a5b4fc);
    transform: scale(1.05);
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const TeamFinder = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: '자은우',
      role: '대학 3년차',
      description: '모든 준비하고 있습니다. 토익준비, 디자인, 패션 등 함께 공부하실 분들 환영해요. 새로운 사람들과 함께 성장하며 배워나가고 싶어요.',
      hashtags: ['토익', '디자인', '패션'],
      avatar: '자',
      lastSeen: '5분 전',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Grute',
      role: "I'm Grute",
      description: '다양한 프로젝트에 관심이 많습니다. 함께 창의적인 아이디어를 나누고 실현해보아요!',
      hashtags: ['프로젝트', '창의'],
      avatar: 'G',
      lastSeen: '1시간 전',
      rating: 4.9
    },
    {
      id: 3,
      name: '김민지',
      role: '프론트엔드 개발자',
      description: 'React, TypeScript를 주로 사용하는 개발자입니다. 사이드 프로젝트나 스터디 함께 하실 분 찾아요.',
      hashtags: ['React', 'TypeScript', '개발'],
      avatar: '김',
      lastSeen: '30분 전',
      rating: 4.7
    }
  ]);

  const handleContact = (person) => {
    alert(`${person.name}님에게 연락하기`);
  };

  const PersonCard = ({ member, onContact }) => (
    <Card onClick={() => onContact(member)}>
      <ContactButton>
        <MessageCircle size={18} />
      </ContactButton>
      
      <ProfileHeader>
        <AvatarWrapper>
          <Avatar>{member.avatar}</Avatar>
          <OnlineIndicator />
        </AvatarWrapper>
        <ProfileInfo>
          <Name>{member.name}</Name>
          <Role>
            <Users size={14} />
            {member.role}
          </Role>
          <MetaInfo>
            <MetaItem>
              <Clock size={12} />
              {member.lastSeen}
            </MetaItem>
            <MetaItem>
              <Star size={12} fill="currentColor" />
              {member.rating}
            </MetaItem>
          </MetaInfo>
        </ProfileInfo>
      </ProfileHeader>
      
      {member.description && <Description>{member.description}</Description>}
      
      {member.hashtags && member.hashtags.length > 0 && (
        <TagsContainer>
          {member.hashtags.map((tag, index) => (
            <Tag key={index}>#{tag}</Tag>
          ))}
        </TagsContainer>
      )}
    </Card>
  );

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <HeaderContent>
            <TitleWrapper>
              <Users color="white" size={40} />
              <Title>팀원 찾기</Title>
            </TitleWrapper>
            <Subtitle>완벽한 팀메이트를 찾아 함께 성장해보세요</Subtitle>
            <SearchResults>
              <Users size={16} />
              {members.length}명의 활성 멤버
            </SearchResults>
          </HeaderContent>
        </Header>
        
        <Grid>
          {members.length > 0 ? (
            members.map((member) => (
              <PersonCard 
                key={member.id} 
                member={member} 
                onContact={handleContact}
              />
            ))
          ) : (
            <EmptyState>
              <Users size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>아직 등록된 멤버가 없습니다.</p>
            </EmptyState>
          )}
        </Grid>
      </ContentWrapper>
    </Container>
  );
};

export default TeamFinder;