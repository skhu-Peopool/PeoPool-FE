import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Edit3,
  Lock,
  Calendar,
  Mail,
  Phone,
  MessageCircle,
  Award,
  BookOpen,
  PenTool,
} from "lucide-react";
import styled, { keyframes } from "styled-components";
import { userService } from "../../lib/api/user-service";

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
const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-out 0.2s both;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  }
`;

const ProfileCard = styled(Card)`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
`;

const ProfileImage = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 8px 32px rgba(96, 165, 250, 0.3);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(45deg, #60a5fa, #3b82f6, #93c5fd);
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${ProfileCard}:hover &::after {
    opacity: 1;
  }
`;

const ProfileImageDisplay = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileImageHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  ${ProfileImageWrapper}:hover & {
    opacity: 1;
  }
`;

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 1.5rem;
  height: 1.5rem;
  background: #10b981;
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
`;
const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const EditInput = styled.input`
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: 700;
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;
const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(96, 165, 250, 0.05);
  border-radius: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(96, 165, 250, 0.1);
    transform: translateX(4px);
  }
`;
const InfoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const InfoValue = styled.div`
  font-size: 0.95rem;
  color: #1f2937;
  font-weight: 500;
  margin-top: 0.25rem;
`;

const InfoInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  color: #1f2937;
  margin-top: 0.25rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  }
`;

const TagsContainer = styled.div`
  margin-bottom: 1.5rem;
`;
const TagsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;
const Tag = styled.span`
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #bfdbfe, #93c5fd);
    transform: scale(1.05);
  }
`;
const TagInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 0.875rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  background: white;
  color: #1f2937;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;
const Introduction = styled.div`
  padding: 1.5rem;
  background: rgba(96, 165, 250, 0.05);
  border-radius: 1rem;
  border-left: 4px solid #60a5fa;
`;
const IntroTitle = styled.h3`
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: 600;
`;
const IntroInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  background: white;
  color: #1f2937;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
  }
`;

const IntroTextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  font-size: 0.95rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  background: white;
  color: #4b5563;
  line-height: 1.6;
  resize: vertical;
  min-height: 4rem;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
  }
`;

const IntroText = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
`;

const ProfileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-end;
`;
const ProfileButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;

  &.edit {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    color: white;
    box-shadow: 0 4px 20px rgba(96, 165, 250, 0.4);
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(96, 165, 250, 0.5);
    }
  }

  &.password {
    background: linear-gradient(135deg, #a5b4fc, #818cf8);
    color: white;
    box-shadow: 0 4px 20px rgba(165, 180, 252, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(165, 180, 252, 0.5);
    }
  }

  &.save {
    background: linear-gradient(135deg, #34d399, #10b981);
    color: white;
    box-shadow: 0 4px 20px rgba(52, 211, 153, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(52, 211, 153, 0.5);
    }
  }

  &.cancel {
    background: linear-gradient(135deg, #9ca3af, #6b7280);
    color: white;
    box-shadow: 0 4px 20px rgba(156, 163, 175, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(156, 163, 175, 0.5);
    }
  }
`;
const ActivitySection = styled(Card)`
  animation: ${fadeIn} 1s ease-out 0.4s both;
`;

const ActivityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(96, 165, 250, 0.1);
`;
const ActivityTitle = styled.h2`
  font-size: 1.5rem;
  color: #1f2937;
  font-weight: 700;
`;

const ActivityIconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
const Timeline = styled.div`
  position: relative;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 1rem;
    top: 2.5rem;
    width: 2px;
    height: calc(100% + 0.5rem);
    background: linear-gradient(to bottom, #60a5fa, transparent);
  }
`;

const TimelineDot = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
  z-index: 2;
  position: relative;
`;

const TimelineContent = styled.div`
  flex: 1;
  background: rgba(96, 165, 250, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
  border-left: 3px solid #60a5fa;
  position: relative;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(96, 165, 250, 0.1);
    transform: translateX(4px);
  }
`;

const ActivityName = styled.h3`
  font-size: 1.125rem;
  color: #1f2937;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const ActivityDate = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActivityHours = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CompleteBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const TimeStamp = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(239, 246, 255, 0.8);
  border-radius: 1rem;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

const ToggleLabel = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
`;

const ToggleSwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
`;

const ToggleSwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
  }

  &:checked + span:before {
    transform: translateX(22px);
  }
`;

const ToggleSwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 28px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ProfileEditPage = () => {
  const DEFAULT_IMAGE_URL =
    "https://peopool-profile-image.s3.ap-northeast-2.amazonaws.com/default.png";

  const [isEditing, setIsEditing] = useState(false);
  const [initialProfileData, setInitialProfileData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [isProfileVisible, setIsProfileVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userService.getMe();
        setProfileData(data);
        setInitialProfileData(data);
        setIsProfileVisible(data.visible === "VISIBLE");
      } catch (error) {
        console.error("사용자 정보를 불러오는데 실패했습니다.", error);
        alert("사용자 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // ✅ [수정] '저장하기' 버튼 눌렀을 때 모든 변경사항을 한번에 저장
  const handleSave = async () => {
    const memberProfileUpdateReq = {
      nickname: profileData.nickname,
      mainIntroduction: profileData.mainIntroduction || "",
      subIntroduction: profileData.subIntroduction || "",
      hashtag: profileData.hashtag || "",
      kakaoId: profileData.kakaoId || "",
    };

    const formData = new FormData();
    formData.append(
      "memberProfileUpdateReq",
      JSON.stringify(memberProfileUpdateReq)
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      // 프로필 정보 업데이트와 공개 여부 업데이트를 동시에 처리
      await Promise.all([
        userService.updateMe(formData),
        userService.updateProfileVisibility(isProfileVisible),
      ]);

      const updatedData = await userService.getMe(); // 최신 데이터 다시 로드
      setInitialProfileData(updatedData);
      setProfileData(updatedData);
      setIsEditing(false);
      setImageFile(null);
      setImagePreview(null);
      alert("프로필이 성공적으로 업데이트되었습니다!");
    } catch (error) {
      console.error("프로필 업데이트에 실패했습니다.", error);
      alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // ✅ [수정] '취소하기' 눌렀을 때 공개 여부 상태도 원래대로 복구
  const handleCancel = () => {
    setProfileData(initialProfileData);
    setIsEditing(false);
    setImageFile(null);
    setImagePreview(null);
    // isProfileVisible 상태도 원래 데이터(initialProfileData) 기준으로 복구
    if (initialProfileData) {
      setIsProfileVisible(initialProfileData.visible === "VISIBLE");
    }
  };

  // ✅ [수정] 토글 시 API 호출 없이 상태만 변경
  const handleVisibilityChange = () => {
    setIsProfileVisible((prev) => !prev);
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  if (!profileData) {
    return <Container>Loading...</Container>;
  }

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

        <ProfileCard>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          <ProfileImageWrapper
            onClick={handleImageClick}
            style={{ cursor: isEditing ? "pointer" : "default" }}>
            {imagePreview ? (
              <ProfileImageDisplay src={imagePreview} alt="Profile Preview" />
            ) : profileData.profileImage &&
              profileData.profileImage !== DEFAULT_IMAGE_URL ? (
              <ProfileImageDisplay
                src={profileData.profileImage}
                alt="Profile"
              />
            ) : (
              <ProfileImage>{getInitials(profileData.nickname)}</ProfileImage>
            )}
            {isEditing && (
              <ProfileImageHover>
                <Edit3 size={24} />
              </ProfileImageHover>
            )}
            <OnlineIndicator />
          </ProfileImageWrapper>

          <ProfileInfo>
            {isEditing ? (
              <EditInput
                type="text"
                value={profileData.nickname}
                onChange={(e) => handleInputChange("nickname", e.target.value)}
                placeholder="이름을 입력하세요"
              />
            ) : (
              <ProfileName>{profileData.nickname}</ProfileName>
            )}

            <InfoGrid>
              <InfoItem>
                <InfoIcon>
                  <Calendar size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>가입일</InfoLabel>
                  <InfoValue>
                    {new Date(profileData.createdAt).toLocaleDateString()}
                  </InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <InfoIcon>
                  <Mail size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Email</InfoLabel>
                  <InfoValue>{profileData.email}</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <InfoIcon>
                  <Phone size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>핸드폰</InfoLabel>
                  <InfoValue>정보 없음</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <InfoIcon>
                  <MessageCircle size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>카카오 ID</InfoLabel>
                  {isEditing ? (
                    <InfoInput
                      type="text"
                      value={profileData.kakaoId || ""}
                      onChange={(e) =>
                        handleInputChange("kakaoId", e.target.value)
                      }
                    />
                  ) : (
                    <InfoValue>{profileData.kakaoId || "정보 없음"}</InfoValue>
                  )}
                </InfoContent>
              </InfoItem>
            </InfoGrid>

            <TagsContainer>
              <InfoLabel style={{ marginBottom: "0.75rem", display: "block" }}>
                관심 분야
              </InfoLabel>
              {isEditing ? (
                <TagInput
                  type="text"
                  value={profileData.hashtag || ""}
                  onChange={(e) => handleInputChange("hashtag", e.target.value)}
                  placeholder="예: 풀스텍, 디자이너 (쉼표로 구분)"
                />
              ) : (
                <TagsGrid>
                  {(profileData.hashtag || "")
                    .split(",")
                    .map((tag, index) =>
                      tag.trim() ? <Tag key={index}>#{tag.trim()}</Tag> : null
                    )}
                </TagsGrid>
              )}
            </TagsContainer>

            <Introduction>
              {isEditing ? (
                <>
                  <InfoLabel style={{ marginBottom: "0.5rem" }}>
                    한 줄 소개
                  </InfoLabel>
                  <InfoInput
                    type="text"
                    value={profileData.subIntroduction || ""}
                    onChange={(e) =>
                      handleInputChange("subIntroduction", e.target.value)
                    }
                    placeholder="나를 한 줄로 표현해보세요."
                    style={{ marginBottom: "1rem" }}
                  />
                  <InfoLabel style={{ marginBottom: "0.5rem" }}>
                    자기소개
                  </InfoLabel>
                  <IntroTextArea
                    value={profileData.mainIntroduction || ""}
                    onChange={(e) =>
                      handleInputChange("mainIntroduction", e.target.value)
                    }
                    rows="4"
                    placeholder="자기소개를 입력하세요."
                  />
                </>
              ) : (
                <>
                  <IntroTitle>
                    {profileData.subIntroduction || "한 줄 소개가 없습니다."}
                  </IntroTitle>
                  <IntroText>
                    {profileData.mainIntroduction || "자기소개가 없습니다."}
                  </IntroText>
                </>
              )}
            </Introduction>

            {/* ✅ [수정] isEditing 상태일 때만 토글 스위치가 보이도록 수정 */}
            {isEditing && (
              <ToggleSwitchWrapper>
                <ToggleLabel>프로필 공개 설정</ToggleLabel>
                <ToggleSwitchContainer>
                  <ToggleSwitchInput
                    type="checkbox"
                    checked={isProfileVisible}
                    onChange={handleVisibilityChange}
                  />
                  <ToggleSwitchSlider />
                </ToggleSwitchContainer>
              </ToggleSwitchWrapper>
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
                <ProfileButton
                  className="edit"
                  onClick={() => setIsEditing(true)}>
                  <Edit3 size={16} />
                  프로필 수정
                </ProfileButton>
                <ProfileButton className="password">
                  <Lock size={16} />
                  비밀번호 변경
                </ProfileButton>
              </>
            )}
          </ProfileActions>
        </ProfileCard>

        <ActivitySection>
          <ActivityHeader>
            <ActivityIconWrapper>
              <Award size={20} />
            </ActivityIconWrapper>
            <ActivityTitle>내 활동내역</ActivityTitle>
          </ActivityHeader>

          <Timeline>
            <TimelineItem>
              <TimelineDot>
                <BookOpen size={12} />
              </TimelineDot>
              <TimelineContent>
                <CompleteBadge>활동 종료</CompleteBadge>
                <ActivityName>UX/UI Design — Basics 스터디</ActivityName>
                <ActivityDate>
                  <Calendar size={14} />
                  22.03.07 ~ 25.04.06 동안 활동했어요.
                </ActivityDate>
                <ActivityHours>
                  <Award size={14} />
                  조회수 89회
                </ActivityHours>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineDot>
                <PenTool size={12} />
              </TimelineDot>
              <TimelineContent>
                <ActivityName>TypeScript 학습 팁 공유</ActivityName>
                <TimeStamp>
                  <Calendar size={14} />
                  작성일 : 2023.12.05
                </TimeStamp>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </ActivitySection>

        <ActivitySection>
          <ActivityHeader>
            <ActivityIconWrapper>
              <PenTool size={20} />
            </ActivityIconWrapper>
            <ActivityTitle>내가 쓴 글</ActivityTitle>
          </ActivityHeader>

          <Timeline>
            <TimelineItem>
              <TimelineDot>
                <BookOpen size={12} />
              </TimelineDot>
              <TimelineContent>
                <CompleteBadge>활동 종료</CompleteBadge>
                <ActivityName>UX/UI Design — Basics 스터디</ActivityName>
                <ActivityDate>
                  <Calendar size={14} />
                  22.03.07 ~ 25.04.06 동안 활동했어요.
                </ActivityDate>
                <ActivityHours>
                  <Award size={14} />
                  조회수 89회
                </ActivityHours>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineDot>
                <PenTool size={12} />
              </TimelineDot>
              <TimelineContent>
                <ActivityName>TypeScript 학습 팁 공유</ActivityName>
                <TimeStamp>
                  <Calendar size={14} />
                  작성일 : 2023.12.05
                </TimeStamp>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </ActivitySection>
      </ContentWrapper>
    </Container>
  );
};
export default ProfileEditPage;
