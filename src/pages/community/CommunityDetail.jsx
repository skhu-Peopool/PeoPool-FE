import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import ApplyModal from "../../components/modal/ApplyModal";
import CompleteModal from "../../components/modal/CompleteModal";
import { useEffect, useState } from "react";
import { Users, Calendar, FileText, Tag, User, Clock, Eye } from "lucide-react";
import { useAuth } from "../../providers/AuthProvider";
import { postService } from "../../lib/api/post-service";
import { categoryLabelMap, statusLabelMap } from "../../lib/labelMaps";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Rendering = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 1.5rem 5rem;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  position: relative;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 2rem auto;
  width: 100%;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.8s ease-out;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.5);
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1e293b;
  line-height: 1.3;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const CategoryBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: #e2e8f0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 16px;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
`;

const Avatar = styled.div`
  min-width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${(props) => props.color || "#3b82f6"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #1e293b;
  font-size: 1.125rem;
`;

const SectionDivider = styled.hr`
  border: none;
  height: 1px;
  background: #e2e8f0;
  margin: 2.5rem 0;
`;

const RecruitInfo = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
`;

const RecruitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;

  &:last-child {
    margin-bottom: 0;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: #e0e7ff;
  border-radius: 8px;
  color: #4338ca;
`;

const Status = styled.span`
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.status) {
      case "모집 중":
        return "#fef3c7";
      case "검토 중":
        return "#d1fae5";
      case "모집완료":
        return "#bfdbfe";
      case "모집예정":
        return "#fed7e2";
      default:
        return "#e5e7eb";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "모집 중":
        return "#92400e";
      case "검토 중":
        return "#065f46";
      case "모집완료":
        return "#1e40af";
      case "모집예정":
        return "#be185d";
      default:
        return "#374151";
    }
  }};
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const DetailContent = styled.div`
  white-space: pre-line;
  font-size: 1.125rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 2rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ImagePreview = styled.img`
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 300px;
  margin: 1rem 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin: 0.75rem 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #60a5fa, #3b82f6);
  border-radius: 4px;
  width: ${(props) => (props.current / props.max) * 100}%;
  transition: all 0.5s ease;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const StatCard = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  text-align: center;
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: #e0e7ff;
  border-radius: 12px;
  color: #4338ca;
  margin: 0 auto 1rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  // border-top: 1px solid #e2e8f0;
`;

const ApplyButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function CommunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthReady } = useAuth();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    if (!isAuthReady) return;

    const fetchPost = async () => {
      try {
        const res = await postService.getPostDetail(id);
        console.log("받은 데이터:", res);
        setPost(res);
      } catch (e) {
        console.error("게시물 로딩 실패", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id, isAuthReady]);

  if (!isAuthReady || isLoading) {
    return <Rendering>로딩 중...</Rendering>;
  }

  if (!post) {
    return <Rendering>게시글을 찾을 수 없습니다.</Rendering>;
  }

  const isWriter = user && user.id === post.writerId;

  const handleEdit = () => {
    navigate(`/posts/edit/${post.id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("정말로 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await postService.deletePost(id);
      alert("게시글이 삭제되었습니다.");
      navigate("/community");
    } catch (e) {
      console.error("삭제 실패", e);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  return (
    <Container>
      <MainContent>
        <ContentCard>
          <Title>{post.title}</Title>

          <MetaInfo>
            <CategoryBadge>
              <Tag size={16} />
              {categoryLabelMap[post.category]}
            </CategoryBadge>
            <Divider />
            <DateInfo>
              <Clock size={16} />
              {post.createdAt.split("T")[0]} 작성
            </DateInfo>
          </MetaInfo>

          <UserInfo>
            <Avatar color={post.color}>{post.writerName.charAt(0)}</Avatar>
            <div>
              <UserName>{post.writerName}</UserName>
              <div
                style={{
                  color: "#64748b",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                게시자
              </div>
            </div>
          </UserInfo>

          <SectionDivider />

          <SectionTitle>
            <FileText size={20} />
            상세 내용
          </SectionTitle>

          <DetailContent>{post.content}</DetailContent>

          <p className="font-semibold mb-6">
            활동 시작일 : {post.activityStartDate}
          </p>

          <ImageWrapper>
            {post.image && (
              <ImagePreview src={post.image} alt="게시글 이미지" />
            )}
          </ImageWrapper>

          <SectionDivider />

          <SectionTitle>
            <Users size={20} />
            모집 정보
          </SectionTitle>

          <RecruitInfo>
            <RecruitItem>
              <IconWrapper>
                <Calendar size={16} />
              </IconWrapper>
              <span>
                모집 기간 : {post.recruitmentStartDate} ~{" "}
                {post.recruitmentEndDate}
              </span>
            </RecruitItem>
            <RecruitItem>
              <IconWrapper>
                <Users size={16} />
              </IconWrapper>
              <div style={{ flex: 1 }}>
                <div>모집 현황 : 0 / {post.maxPeople}</div>
                <ProgressBar>
                  <ProgressFill current={0} max={post.maxPeople} />
                </ProgressBar>
              </div>
            </RecruitItem>
            <RecruitItem>
              <IconWrapper>
                <Eye size={16} />
              </IconWrapper>
              <span>
                모집 상태 :{" "}
                <Status status={statusLabelMap[post.status]}>
                  {statusLabelMap[post.status]}
                </Status>
              </span>
            </RecruitItem>
          </RecruitInfo>

          <StatsGrid>
            <StatCard>
              <StatIcon>
                <Users size={20} />
              </StatIcon>
              <StatValue>{0}</StatValue>
              <StatLabel>현재 지원자</StatLabel>
            </StatCard>
            <StatCard>
              <StatIcon>
                <Calendar size={20} />
              </StatIcon>
              <StatValue>82</StatValue>
              <StatLabel>남은 일수</StatLabel>
            </StatCard>
            <StatCard>
              <StatIcon>
                <Eye size={20} />
              </StatIcon>
              <StatValue>156</StatValue>
              <StatLabel>조회수</StatLabel>
            </StatCard>
          </StatsGrid>

          <ButtonContainer>
            {isWriter ? (
              <div className="flex justify-end gap-2">
                <ApplyButton onClick={handleEdit}>수정</ApplyButton>
                <ApplyButton onClick={handleDelete}>삭제</ApplyButton>
              </div>
            ) : (
              <ApplyButton onClick={() => setShowApplyModal(true)}>
                지원하기
              </ApplyButton>
            )}
          </ButtonContainer>
        </ContentCard>
      </MainContent>

      {showApplyModal && (
        <ApplyModal
          onClose={() => setShowApplyModal(false)}
          onComplete={() => {
            setShowApplyModal(false);
            setShowCompleteModal(true);
          }}
        />
      )}

      {showCompleteModal && (
        <CompleteModal onClose={() => setShowCompleteModal(false)} />
      )}
    </Container>
  );
}
