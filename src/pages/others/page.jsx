import React, { useEffect, useState } from "react";
import { Users, MessageCircle, Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Header from "../../components/Header";
import { userService } from "../../lib/api/user-service";
import { chatService } from "../../lib/api/chat-service";

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
  gap: 4rem;
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

  min-height: 250px;
  min-width: 360px;

  &::before {
    content: "";
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: scale(0.95);
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
    content: "";
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

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
`;

const Role = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  white-space: nowrap;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  color: #9ca3af;
  white-space: nowrap;
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
  white-space: nowrap;
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
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const TeamFinder = () => {
  const [members, setMembers] = useState([]);
  const [startingChat, setStartingChat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await userService.getVisibleProfiles();
        const mapped = response.userList.map((user) => ({
          id: user.id,
          name: user.nickname,
          role: user.subIntroduction || "역할 정보 없음",
          description: user.mainIntroduction || "",
          hashtags: user.hashtag
            ? user.hashtag.split(",").map((tag) => tag.trim())
            : [],
          avatar: user.nickname ? user.nickname.charAt(0) : "?",
          lastSeen: user.email,
          rating: user.kakaoId || "N/A",
        }));
        setMembers(mapped);
      } catch (err) {
        console.error("팀원 데이터 불러오기 실패", err);
      }
    }
    fetchMembers();
  }, []);

  const handleStartChat = async (member, e) => {
      e.stopPropagation();
      
      if (startingChat === member.id) return;
      
      try {
        setStartingChat(member.id);
        
        console.log("채팅 시작 시도:", { memberId: member.id, memberName: member.name });
        
        // 메시지 전송
        await chatService.startChatWithMessage(
          member.id, 
          "안녕하세요! 팀원 찾기에서 연락드립니다. 😊"
        );
        
        console.log("채팅 시작 성공");
        setTimeout(() => {
          navigate('/chat', { 
            state: { 
              targetMemberId: member.id,
              targetMemberName: member.name,
              justCreated: true
            } 
          });
        }, 100);
        
      } catch (error) {
        console.error("채팅 시작 실패:", error);
        alert(error.message || "채팅을 시작하는데 실패했습니다. 다시 시도해주세요.");
      } finally {
        setStartingChat(null);
      }
    };

  const PersonCard = ({ member }) => (
    <Card>
      <ContactButton 
        onClick={(e) => handleStartChat(member, e)}
        disabled={startingChat === member.id}
        title={`${member.name}님과 채팅하기`}
      >
        {startingChat === member.id ? (
          <LoadingSpinner />
        ) : (
          <MessageCircle size={18} />
        )}
      </ContactButton>

      <ProfileHeader>
        <AvatarWrapper>
          <Avatar>{member.avatar}</Avatar>
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
        <Header
          icon={<Users color="white" size={40} />}
          title={"팀원 찾기"}
          subTitle={"완벽한 팀메이트를 찾아 함께 성장해보세요"}
        />
        <Grid>
          {members.length > 0 ? (
            members.map((member) => (
              <PersonCard key={member.id} member={member} />
            ))
          ) : (
            <EmptyState>
              <p>아직 등록된 멤버가 없습니다.</p>
            </EmptyState>
          )}
        </Grid>
      </ContentWrapper>
    </Container>
  );
};

export default TeamFinder;