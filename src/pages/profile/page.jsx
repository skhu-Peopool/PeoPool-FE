import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
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
  width: 8rem;
  height: 8rem;
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

const EditInput = styled.input`
  font-size: 1.75rem;
  color: #c084fc;
  margin-bottom: 1rem;
  font-weight: 500;
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #c084fc;
    box-shadow: 0 0 0 3px rgba(192, 132, 252, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #666;

  strong {
    color: #333;
    display: inline-block;
    min-width: 4rem;
  }
`;

const InfoLabel = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const InfoInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #666;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #c084fc;
    box-shadow: 0 0 0 3px rgba(192, 132, 252, 0.1);
  }
`;

const InfoInputGroup = styled.div`
  margin-bottom: 0.75rem;
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

const TagInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #666;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #c084fc;
    box-shadow: 0 0 0 3px rgba(192, 132, 252, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
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
  min-width: 7rem;

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

  &.save {
    background: #4ade80;
    color: white;

    &:hover {
      background: #22c55e;
      transform: translateY(-2px);
      box-shadow: 0 0.25rem 0.75rem rgba(74, 222, 128, 0.4);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 0.125rem 0.375rem rgba(74, 222, 128, 0.3);
    }
  }

  &.cancel {
    background: #9ca3af;
    color: white;

    &:hover {
      background: #6b7280;
      transform: translateY(-2px);
      box-shadow: 0 0.25rem 0.75rem rgba(156, 163, 175, 0.4);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 0.125rem 0.375rem rgba(156, 163, 175, 0.3);
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

const IntroInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #333;
  margin-bottom: 0.625rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #c084fc;
    box-shadow: 0 0 0 3px rgba(192, 132, 252, 0.1);
  }
`;

const IntroTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #666;
  line-height: 1.5;
  resize: vertical;
  min-height: 3rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #c084fc;
    box-shadow: 0 0 0 3px rgba(192, 132, 252, 0.1);
  }
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

  strong {
    color: #333;
  }
`;

const KakaoInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #666;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #c084fc;
    box-shadow: 0 0 0 3px rgba(192, 132, 252, 0.1);
  }
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

const ProfileEditPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '010 - 8765-2431',
    birthday: 'March 15, 1995',
    joinDate: '2022년 4월 7일',
    tags: ['풀스텍', '디자이너', '클라이머'],
    introTitle: '대학 3년차',
    introText1: '모델 준비하고 있습니다.',
    introText2: '토익준비, 디자인, 패션 등 함께 공부하실분을 환영해요!',
    kakaoId: 'John_Doe'
  });
  const [tagInput, setTagInput] = useState(profileData.tags.join(', '));
  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagsChange = (value) => {
    // 빈 문자열이면 빈 배열로 설정
    if (!value.trim()) {
      setProfileData(prev => ({
        ...prev,
        tags: []
      }));
      return;
    }
    
    const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setProfileData(prev => ({
      ...prev,
      tags: tagsArray
    }));
  };

 

  const handleCancel = () => {
    setIsEditing(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const handleSave = () => {
    setProfileData(prev => ({
      ...prev,
      tags: tagInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '')
    }));
    setIsEditing(false);
  };

  return (
    <Container>
      <Title>Profile</Title>
      
      <Card>
        <ProfileImage>
          {getInitials(profileData.name)}
        </ProfileImage>
        
        <ProfileInfo>
          {isEditing ? (
            <>
              <EditInput
                type="text"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="이름을 입력하세요"
              />
              
              <InfoInputGroup>
                <InfoLabel>가입일</InfoLabel>
                <InfoInput
                  type="text"
                  value={profileData.joinDate}
                  onChange={(e) => handleInputChange('joinDate', e.target.value)}
                />
              </InfoInputGroup>
              
              <InfoInputGroup>
                <InfoLabel>생일</InfoLabel>
                <InfoInput
                  type="text"
                  value={profileData.birthday}
                  onChange={(e) => handleInputChange('birthday', e.target.value)}
                />
              </InfoInputGroup>
              
              <InfoInputGroup>
                <InfoLabel>Email</InfoLabel>
                <InfoInput
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </InfoInputGroup>
              
              <InfoInputGroup>
                <InfoLabel>핸드폰</InfoLabel>
                <InfoInput
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </InfoInputGroup>
              
              <InfoInputGroup>
                <InfoLabel>태그 (쉼표로 구분)</InfoLabel>
                <TagInput
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="예: 풀스텍, 디자이너, 클라이머"
                />
              </InfoInputGroup>
              
              <Introduction>
                <InfoLabel>소개 제목</InfoLabel>
                <IntroInput
                  type="text"
                  value={profileData.introTitle}
                  onChange={(e) => handleInputChange('introTitle', e.target.value)}
                />
                
                <InfoLabel>소개 내용 1</InfoLabel>
                <IntroTextArea
                  value={profileData.introText1}
                  onChange={(e) => handleInputChange('introText1', e.target.value)}
                  rows="2"
                />
                
                <InfoLabel>소개 내용 2</InfoLabel>
                <IntroTextArea
                  value={profileData.introText2}
                  onChange={(e) => handleInputChange('introText2', e.target.value)}
                  rows="2"
                />
                
                <InfoLabel>카카오톡 ID</InfoLabel>
                <KakaoInput
                  type="text"
                  value={profileData.kakaoId}
                  onChange={(e) => handleInputChange('kakaoId', e.target.value)}
                />
              </Introduction>
            </>
          ) : (
            <>
              <ProfileName>{profileData.name}</ProfileName>
              <InfoItem><strong>가입일:</strong> {profileData.joinDate}</InfoItem>
              <InfoItem><strong>생일:</strong> {profileData.birthday}</InfoItem>
              <InfoItem><strong>Email:</strong> {profileData.email}</InfoItem>
              <InfoItem><strong>핸드폰:</strong> {profileData.phone}</InfoItem>
              
              <Tags>
                {profileData.tags.map((tag, index) => (
                  <Tag key={index}>#{tag}</Tag>
                ))}
              </Tags>
              
              <Introduction>
                <IntroTitle>{profileData.introTitle}</IntroTitle>
                <IntroText>{profileData.introText1}</IntroText>
                <IntroText>{profileData.introText2}</IntroText>
                
                <KakaoId><strong>카카오톡:</strong> {profileData.kakaoId}</KakaoId>
              </Introduction>
            </>
          )}
        </ProfileInfo>
        
        <ProfileActions>
          {isEditing ? (
            <>
              <ProfileButton className="save" onClick={handleSave}>
                저장하기
              </ProfileButton>
              <ProfileButton className="cancel" onClick={handleCancel}>
                취소하기
              </ProfileButton>
            </>
          ) : (
            <>
              <ProfileButton className="edit" onClick={() => setIsEditing(true)}>
                프로필 수정
              </ProfileButton>
              <ProfileButton className="password">
                비밀번호 변경
              </ProfileButton>
            </>
          )}
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
};

export default ProfileEditPage;