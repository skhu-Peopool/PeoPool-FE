import { useEffect, useState } from "react";
import {
  Calendar,
  Award,
  BookOpen,
  PenTool,
  Users,
  Clock,
  Eye,
  Edit3,
} from "lucide-react";
import styled, { keyframes } from "styled-components";
import { postService } from "../lib/api/post-service";
import { enrollmentService } from "../lib/api/enrollment-service";
import { categoryLabelMap } from "../lib/labelMaps";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
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

const ActivitySection = styled(Card)`
  animation: ${fadeIn} 1s ease-out 0.4s both;
`;

const ActivityHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(96, 165, 250, 0.1);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActivityTitle = styled.h2`
  font-size: 1.5rem;
  color: #1f2937;
  font-weight: 700;
`;

const ActivityCount = styled.span`
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ActivityDate = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActivityMeta = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CategoryBadge = styled.span`
  background: ${(props) => {
    switch (props.category) {
      case "동아리":
        return "linear-gradient(135deg, #e9d5ff, #ddd6fe)";
      case "어울림":
        return "linear-gradient(135deg, #dbeafe, #bfdbfe)";
      case "경진대회":
        return "linear-gradient(135deg, #dcfce7, #bbf7d0)";
      case "공모전":
        return "linear-gradient(135deg, #fef3c7, #fde68a)";
      default:
        return "linear-gradient(135deg, #f3f4f6, #e5e7eb)";
    }
  }};
  color: ${(props) => {
    switch (props.category) {
      case "동아리":
        return "#7c3aed";
      case "어울림":
        return "#2563eb";
      case "경진대회":
        return "#16a34a";
      case "공모전":
        return "#d97706";
      default:
        return "#4b5563";
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StatusBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${(props) => {
    switch (props.status) {
      case "RECRUITING":
        return "linear-gradient(135deg, #dcfce7, #bbf7d0)";
      case "CLOSED":
        return "linear-gradient(135deg, #fee2e2, #fecaca)";
      case "COMPLETED":
        return "linear-gradient(135deg, #d1fae5, #a7f3d0)";
      default:
        return "linear-gradient(135deg, #f3f4f6, #e5e7eb)";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "RECRUITING":
        return "#065f46";
      case "CLOSED":
        return "#991b1b";
      case "COMPLETED":
        return "#065f46";
      default:
        return "#4b5563";
    }
  }};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const EmptyState = styled.div`
  padding: 4rem 2rem;
  text-align: center;
`;

const EmptyIcon = styled.div`
  margin: 0 auto 1rem;
  color: #9ca3af;
  display: flex;
  justify-content: center;
`;

const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const EmptySubtitle = styled.p`
  color: #6b7280;
`;

const Activity = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [myApprovedEnrollments, setMyApprovedEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // 내가 작성한 글 가져오기
        const postsResponse = await postService.getMyPost();
        const formattedPosts = postsResponse.posts.map((post) => ({
          id: post.id,
          title: post.title,
          category: categoryLabelMap[post.category] || post.category,
          maxPeople: post.maxPeople,
          appliedPeople: post.appliedPeople || 0,
          postStatus: post.postStatus,
          createdAt: post.createdAt,
          viewCount: post.viewCount || 0,
        }));
        setMyPosts(formattedPosts);

        const approvedResponse =
          await enrollmentService.getMyApprovedEnrollments();
        const formattedApproved = approvedResponse.map((enrollment) => ({
          id: enrollment.enrollmentId,
          title: enrollment.postTitle,
          category:
            categoryLabelMap[enrollment.postCategory] ||
            enrollment.postCategory,
          status: enrollment.status,
          appliedAt: enrollment.appliedAt,
          comment: enrollment.comment,
        }));
        setMyApprovedEnrollments(formattedApproved);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getStatusText = (status) => {
    switch (status) {
      case "RECRUITING":
        return "모집 중";
      case "RECRUITED":
        return "모집완료";
      case "UPCOMING":
        return "모집예정";
      case "UNDER_REVIEW":
        return "검토 중";
      case "APPROVED":
        return "승인됨";
      default:
        return "상태 미상";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "");
  };

  if (loading) {
    return (
      <ActivitySection>
        <EmptyState>
          <EmptyIcon>
            <Clock size={48} />
          </EmptyIcon>
          <EmptyTitle>데이터를 불러오는 중...</EmptyTitle>
        </EmptyState>
      </ActivitySection>
    );
  }

  return (
    <>
      {/* 내가 작성한 글 */}
      <ActivitySection>
        <ActivityHeader>
          <HeaderLeft>
            <ActivityIconWrapper>
              <PenTool size={20} />
            </ActivityIconWrapper>
            <ActivityTitle>내가 작성한 글</ActivityTitle>
          </HeaderLeft>
          <ActivityCount>{myPosts.length}개</ActivityCount>
        </ActivityHeader>

        {myPosts.length > 0 ? (
          <Timeline>
            {myPosts.map((post) => (
              <TimelineItem key={post.id}>
                <TimelineDot>
                  <BookOpen size={12} />
                </TimelineDot>
                <TimelineContent>
                  <StatusBadge status={post.postStatus}>
                    {getStatusText(post.postStatus)}
                  </StatusBadge>
                  <CategoryBadge category={post.category}>
                    {post.category}
                  </CategoryBadge>
                  <ActivityName>{post.title}</ActivityName>
                  <ActivityDate>
                    <Calendar size={14} />
                    작성일: {formatDate(post.createdAt)}
                  </ActivityDate>
                  <ActivityMeta>
                    <MetaItem>
                      <Users size={14} />
                      신청 {post.appliedPeople}명 / 정원 {post.maxPeople}명
                    </MetaItem>
                    <MetaItem>
                      <Eye size={14} />
                      조회수 {post.viewCount}회
                    </MetaItem>
                  </ActivityMeta>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <EmptyState>
            <EmptyIcon>
              <PenTool size={48} />
            </EmptyIcon>
            <EmptyTitle>작성한 글이 없습니다</EmptyTitle>
            <EmptySubtitle>
              새로운 활동을 만들어 사람들과 함께해보세요!
            </EmptySubtitle>
          </EmptyState>
        )}
      </ActivitySection>

      {/* 내 참여 활동 */}
      <ActivitySection>
        <ActivityHeader>
          <HeaderLeft>
            <ActivityIconWrapper>
              <Award size={20} />
            </ActivityIconWrapper>
            <ActivityTitle>내 참여 활동</ActivityTitle>
          </HeaderLeft>
          <ActivityCount>{myApprovedEnrollments.length}개</ActivityCount>
        </ActivityHeader>

        {myApprovedEnrollments.length > 0 ? (
          <Timeline>
            {myApprovedEnrollments.map((activity) => (
              <TimelineItem key={activity.id}>
                <TimelineDot>
                  <Users size={12} />
                </TimelineDot>
                <TimelineContent>
                  <StatusBadge status={activity.status}>
                    {getStatusText(activity.status)}
                  </StatusBadge>
                  <CategoryBadge category={activity.category}>
                    {activity.category}
                  </CategoryBadge>
                  <ActivityName>{activity.title}</ActivityName>
                  <ActivityDate>
                    <Calendar size={14} />
                    신청일: {formatDate(activity.appliedAt)}
                  </ActivityDate>
                  <ActivityMeta>
                    <MetaItem>
                      <Edit3 size={14} />
                      코멘트: {activity.comment}
                    </MetaItem>
                  </ActivityMeta>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <EmptyState>
            <EmptyIcon>
              <Award size={48} />
            </EmptyIcon>
            <EmptyTitle>참여한 활동이 없습니다</EmptyTitle>
            <EmptySubtitle>관심있는 활동에 신청해보세요!</EmptySubtitle>
          </EmptyState>
        )}
      </ActivitySection>
    </>
  );
};

export default Activity;
