import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  gap: 2rem;
`;

const ProfileImage = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #c084fc, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: bold;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 1.75rem;
  color: #c084fc;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const InfoItem = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #666;

  strong {
    color: #333;
  }
`;

const Tags = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
`;

const ProfileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  align-items: flex-end;
`;

const ProfileButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 1.25rem;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.3s ease;

  &.edit {
    background: #93c5fd;
    color: white;

    &:hover {
      background: #60a5fa;
      transform: translateY(-2px);
      box-shadow: 0 0.25rem 0.75rem rgba(147, 197, 253, 0.4);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 0.125rem 0.375rem rgba(147, 197, 253, 0.3);
    }
  }

  &.password {
    background: #a5b4fc;
    color: white;

    &:hover {
      background: #818cf8;
      transform: translateY(-2px);
      box-shadow: 0 0.25rem 0.75rem rgba(165, 180, 252, 0.4);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 0.125rem 0.375rem rgba(165, 180, 252, 0.3);
    }
  }
`;

const Introduction = styled.div`
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid #eee;
`;

const IntroTitle = styled.h3`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.625rem;
`;

const IntroText = styled.p`
  color: #666;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const KakaoId = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #666;
`;

const ActivitySection = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ActivityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
`;

const ActivityTitle = styled.h2`
  font-size: 24px;
  color: #333;
  font-weight: bold;
`;
const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
`;

const ActivityDot = styled.div`
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  background: #93c5fd;
  margin-top: 0.5rem;
  flex-shrink: 0;
  z-index: 2;
`;

const ActivityLine = styled.div`
  position: absolute;
  left: 0.375rem;
  top: 1.375rem;
  width: 0.125rem;
  height: calc(100% - 0.625rem);
  background: #93c5fd;
  z-index: 1;
`;

const ActivityContent = styled.div`
  flex: 1;
  border-left: 0.1875rem solid #93c5fd;
  background-color: #F8FAFC;
  border-radius: 0.5rem;
  padding: 1.25rem;
  position: relative;
  margin-left: -0.1875rem;
`;

const ActivityName = styled.h3`
  font-size: 1.125rem;
  color: #333;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const ActivityDate = styled.div`
  font-size: 0.875rem;
  color: #888;
  margin-bottom: 0.5rem;
`;

const ActivityHours = styled.div`
  font-size: 0.875rem;
  color: #888;
`;

const CompleteBadge = styled.span`
  background: #d1fae5;
  color: #065f46;
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  font-weight: 500;
`;

const TimeStamp = styled.div`
  color: #666;
  font-size: 0.75rem;
  margin-top: 0.625rem;
`;
export default function ProfilePage() {
  return (
    <Container>
      <Title>Profile</Title>
      
      <Card>
        <ProfileImage>JD</ProfileImage>
        
        <ProfileInfo>
          <ProfileName>John Doe</ProfileName>
          <InfoItem><strong>가입일:</strong> 2022년 4월 7일</InfoItem>
          <InfoItem><strong>생일:</strong> March 15, 1995</InfoItem>
          <InfoItem><strong>Email:</strong> johndoe@email.com</InfoItem>
          <InfoItem><strong>핸드폰:</strong> 010 - 8765-2431</InfoItem>
          
          <Tags>
            <Tag>#풀스텍</Tag>
            <Tag>#디자이너</Tag>
            <Tag>#클라이머</Tag>
          </Tags>
          
          <Introduction>
            <IntroTitle>대학 3년차</IntroTitle>
            <IntroText>모델 준비하고 있습니다.</IntroText>
            <IntroText>토익준비, 디자인, 패션 등 함께 공부하실분을 환영해요!</IntroText>
            
            <KakaoId><strong>카카오톡:</strong> John_Doe</KakaoId>
          </Introduction>
        </ProfileInfo>
        
        <ProfileActions>
          <ProfileButton className="edit">프로필 수정</ProfileButton>
          <ProfileButton className="password">비밀번호 변경</ProfileButton>
        </ProfileActions>
      </Card>
      
      <ActivitySection>
        <ActivityHeader>
          <ActivityTitle>내 활동내역</ActivityTitle>
        </ActivityHeader>
        
        <ActivityItem>
          <ActivityDot />
          <ActivityContent>
            <CompleteBadge>활동 종료</CompleteBadge>
            <ActivityName>UX/UI Design — Basics 스터디</ActivityName>
            <ActivityDate>22.03.07 ~ 25.04.06 동안 활동했어요.</ActivityDate>
            <ActivityHours>24회 활동함</ActivityHours>
          </ActivityContent>
          <ActivityLine />
        </ActivityItem>
        
        <ActivityItem>
          <ActivityDot />
          <ActivityContent>
            <CompleteBadge>활동 종료</CompleteBadge>
            <ActivityName>UX/UI Design — Advanced 스터디</ActivityName>
            <ActivityDate>22.03.07 ~ 25.04.06 동안 활동했어요.</ActivityDate>
            <ActivityHours>18회 활동함</ActivityHours>
          </ActivityContent>
          <ActivityLine />
        </ActivityItem>
        
        <ActivityItem>
          <ActivityDot />
          <ActivityContent>
            <ActivityName>UX/UI Design — Animation 스터디</ActivityName>
            <TimeStamp>시작일 : 15:06 2023</TimeStamp>
          </ActivityContent>
        </ActivityItem>
      </ActivitySection>

      <ActivitySection>
        <ActivityHeader>
          <ActivityTitle>내가 쓴 글</ActivityTitle>
        </ActivityHeader>
        
        <ActivityItem>
          <ActivityDot />
          <ActivityContent>
            <CompleteBadge>활동 종료</CompleteBadge>
            <ActivityName>UX/UI Design — Basics 스터디</ActivityName>
            <ActivityDate>22.03.07 ~ 25.04.06 동안 활동했어요.</ActivityDate>
            <ActivityHours>24회 활동함</ActivityHours>
          </ActivityContent>
          <ActivityLine />
        </ActivityItem>
        
        <ActivityItem>
          <ActivityDot />
          <ActivityContent>
            <CompleteBadge>활동 종료</CompleteBadge>
            <ActivityName>UX/UI Design — Advanced 스터디</ActivityName>
            <ActivityDate>22.03.07 ~ 25.04.06 동안 활동했어요.</ActivityDate>
            <ActivityHours>18회 활동함</ActivityHours>
          </ActivityContent>
          <ActivityLine />
        </ActivityItem>
        
        <ActivityItem>
          <ActivityDot />
          <ActivityContent>
            <ActivityName>UX/UI Design — Animation 스터디</ActivityName>
            <TimeStamp>시작일 : 15:06 2023</TimeStamp>
          </ActivityContent>
        </ActivityItem>
      </ActivitySection>
    </Container>
  );
}