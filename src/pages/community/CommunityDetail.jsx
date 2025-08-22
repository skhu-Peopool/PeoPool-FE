import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import example from "../../assets/example.svg";
import mockOrders from "../../lib/ordersData";
import ApplyModal from "../../components/modal/ApplyModal";
import CompleteModal from "../../components/modal/CompleteModal";
import { useState } from "react";

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
`;

const Tag = styled.span`
  color: #3b82f6;
  margin-right: 0.5rem;
`;

const ImagePreview = styled.img`
  display: flex;
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 1rem;
`;

const FileInfo = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 2rem;
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

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const order = mockOrders.find((item) => item.id === parseInt(id));

  if (!order) {
    return <Container>게시글을 찾을 수 없습니다.</Container>;
  }

  return (
    <Container>
      <MainContent>
        <Title>{order.title}</Title>
        <MetaInfo>
          <span className="text-[var(--color-primary)] font-bold">
            {order.category}
          </span>
          <div className="w-px bg-gray-300" />
          <span>{order.date} 작성</span>
        </MetaInfo>

        <UserInfo1>
          <Avatar color={order.color}>{order.initial}</Avatar>
          <UserName>{order.name}</UserName>
        </UserInfo1>

        <hr className="my-5 border-gray-300" />

        <RecruitInfo>
          <p>모집 기간 : 25.03.07 ~ 25.06.25</p>
          <p>
            모집 현황 : {order.currentApplicants} / {order.maxApplicants}
          </p>
          <p>
            모집 상태 : <Status status={order.status}>{order.status}</Status>
          </p>
        </RecruitInfo>

        <hr className="my-5 border-gray-300" />

        <h3 className="font-semibold text-lg mb-2">상세 내용</h3>
        <DetailContent>
          매주 함께 토익스터디 하실 분 구해용
          {"\n"}기존 혼자 하시던 분, 새로 시작하시는 분 상관없습니다!
          {"\n"}꾸준히 참여만 해주신다면 누구든 환영!
          {"\n"}매주 뒤풀이도 선택적으로 참여하실 수 있습니다.
        </DetailContent>

        <Tag>#토익</Tag>
        <Tag>#스터디</Tag>

        <ImagePreview src={example} alt="임시 이미지" />

        <hr className="my-9 border-gray-300" />

        <FileInfo>첨부파일 1개 - </FileInfo>

        <ApplyButton onClick={() => setShowApplyModal(true)}>
          지원하기
        </ApplyButton>
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
