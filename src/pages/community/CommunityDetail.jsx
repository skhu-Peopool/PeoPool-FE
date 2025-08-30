import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ApplyModal from "../../components/modal/ApplyModal";
import CompleteModal from "../../components/modal/CompleteModal";
import { useEffect, useState } from "react";
import { categoryLabelMap, statusLabelMap } from "../../lib/labelMaps";
import { postService } from "../../lib/api/post-service";
import { useAuth } from "../../providers/AuthProvider";

const Rendering = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 3rem;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 0.8rem;
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const UserInfo1 = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.15rem;
  font-weight: 500;
`;

const Avatar = styled.div`
  min-width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${(props) => props.color || "var(--color-primary)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;

const UserName = styled.span`
  font-weight: 400;
  color: #1e293b;
  font-size: 1rem;
`;

const RecruitInfo = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const Status = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.status) {
      case "모집 중":
        return "#fef3c7";
      case "검토 중":
        return "#d1fae5";
      case "모집마감":
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
      case "모집마감":
        return "#1e40af";
      case "모집예정":
        return "#be185d";
      default:
        return "#374151";
    }
  }};
`;

const DetailContent = styled.p`
  white-space: pre-line;
  font-size: 1rem;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 1.5rem;
  min-height: 50px;
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

const ApplyButton = styled.button`
  background: #60a5fa;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  cursor: pointer;
  float: right;
  transition: all 0.2s ease;

  &:hover {
    background: #4286daff;
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

  const isWriter = user && user.userId === post.writerId;

  const handleEdit = () => {};

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
        <Title>{post.title}</Title>
        <MetaInfo>
          <span className="text-[var(--color-primary)] font-['Arial] font-bold">
            {categoryLabelMap[post.category]}
          </span>
          <div className="w-px bg-gray-300" />
          <span className="font-['Arial'] text-black">
            {post.createdAt.split("T")[0]} 작성
            {/* 이 부분 dayjs로 시간 형식 맞출예정 */}
          </span>
        </MetaInfo>
        <UserInfo1>
          <Avatar>{post.writerName.charAt(0)}</Avatar>
          <UserName>{post.writerName}</UserName>
        </UserInfo1>
        <hr className="my-5 border-gray-300" />
        <RecruitInfo>
          <p>
            모집 기간 : {post.recruitmentStartDate} ~ {post.recruitmentEndDate}
          </p>
          <p>모집 현황 : 0 / {post.maxPeople}</p>
          <p>
            모집 상태 :{" "}
            <Status status={statusLabelMap[post.status]}>
              {statusLabelMap[post.status]}
            </Status>
          </p>
        </RecruitInfo>
        <hr className="my-5 border-gray-300" />
        <h3 className="font-semibold text-lg mb-2">상세 내용</h3>
        <DetailContent>{post.content}</DetailContent>
        <p className="font-semibold mb-6">
          활동 시작일 : {post.activityStartDate}
        </p>
        <ImageWrapper>
          {post.image && <ImagePreview src={post.image} alt="게시글 이미지" />}
        </ImageWrapper>
        <hr className="my-9 border-gray-300" />
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
