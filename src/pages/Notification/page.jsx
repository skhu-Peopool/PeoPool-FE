import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info, 
  X, 
  Users,
  Clock,
  Award,
  Eye
} from 'lucide-react';

// --- Animations ---
const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const slideOutRight = keyframes`
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(100%) scale(0.9);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

// --- Notification Container ---
const NotificationContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 420px;
  width: 100%;
  pointer-events: none;
  
  @media (max-width: 640px) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
`;

// --- Notification Card ---
const NotificationCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 32px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  pointer-events: auto;
  position: relative;
  overflow: hidden;
  
  animation: ${props => props.isExiting ? slideOutRight : slideInRight} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => {
      switch (props.type) {
        case 'success': return 'linear-gradient(135deg, #10b981, #059669)';
        case 'error': return 'linear-gradient(135deg, #ef4444, #dc2626)';
        case 'warning': return 'linear-gradient(135deg, #f59e0b, #d97706)';
        case 'info': return 'linear-gradient(135deg, #3b82f6, #2563eb)';
        case 'application': return 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
        default: return 'linear-gradient(135deg, #60a5fa, #3b82f6)';
      }
    }};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.15),
      0 10px 40px rgba(0, 0, 0, 0.1);
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

const IconWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  animation: ${pulse} 2s ease-in-out infinite;
  
  background: ${props => {
    switch (props.type) {
      case 'success': return 'linear-gradient(135deg, #dcfce7, #bbf7d0)';
      case 'error': return 'linear-gradient(135deg, #fee2e2, #fecaca)';
      case 'warning': return 'linear-gradient(135deg, #fef3c7, #fde68a)';
      case 'info': return 'linear-gradient(135deg, #dbeafe, #bfdbfe)';
      case 'application': return 'linear-gradient(135deg, #e9d5ff, #ddd6fe)';
      default: return 'linear-gradient(135deg, #dbeafe, #bfdbfe)';
    }
  }};
`;

const CloseButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #374151;
    transform: scale(1.1);
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
`;

const NotificationMessage = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const NotificationMeta = styled.div`
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

// --- Action Buttons ---
const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: none;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ApproveButton = styled(ActionButton)`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  
  &:hover {
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
  }
`;

const RejectButton = styled(ActionButton)`
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  
  &:hover {
    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
  }
`;

const ViewButton = styled(ActionButton)`
  background: rgba(0, 0, 0, 0.05);
  color: #6b7280;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #374151;
  }
`;

// --- Demo Container ---
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;

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

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 2rem;
`;

const DemoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const DemoCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DemoButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// --- Notification Component ---
const Notification = ({ notification, onClose, onApprove, onReject, onView }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (notification.autoClose !== false) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success': return <CheckCircle size={20} color="#059669" />;
      case 'error': return <XCircle size={20} color="#dc2626" />;
      case 'warning': return <AlertCircle size={20} color="#d97706" />;
      case 'info': return <Info size={20} color="#2563eb" />;
      case 'application': return <Users size={20} color="#7c3aed" />;
      default: return <Bell size={20} color="#3b82f6" />;
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    if (diff < 60000) return '방금 전';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`;
    return time.toLocaleDateString();
  };

  return (
    <NotificationCard type={notification.type} isExiting={isExiting}>
      <NotificationHeader>
        <IconWrapper type={notification.type}>
          {getIcon()}
        </IconWrapper>
        <NotificationContent>
          <NotificationTitle>{notification.title}</NotificationTitle>
          <NotificationMessage>{notification.message}</NotificationMessage>
        </NotificationContent>
        <CloseButton onClick={handleClose}>
          <X size={16} />
        </CloseButton>
      </NotificationHeader>
      
      <NotificationMeta>
        <MetaItem>
          <Clock size={12} />
          {formatTime(notification.timestamp)}
        </MetaItem>
        {notification.category && (
          <MetaItem>
            <Award size={12} />
            {notification.category}
          </MetaItem>
        )}
      </NotificationMeta>
      
      {notification.type === 'application' && notification.showActions && (
        <ActionButtons>
          <ViewButton onClick={() => onView && onView(notification)}>
            <Eye size={16} />
            상세보기
          </ViewButton>
          <RejectButton onClick={() => onReject && onReject(notification)}>
            <XCircle size={16} />
            거절
          </RejectButton>
          <ApproveButton onClick={() => onApprove && onApprove(notification)}>
            <CheckCircle size={16} />
            승인
          </ApproveButton>
        </ActionButtons>
      )}
    </NotificationCard>
  );
};


//실험용  알림 데모임 이거 보고 값 넣어서 하면 됨
const NotificationDemo = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      timestamp: Date.now(),
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleApprove = (notification) => {
    addNotification({
      type: 'success',
      title: '신청 승인 완료',
      message: `${notification.userName}님의 신청을 승인했습니다.`,
      duration: 4000
    });
    removeNotification(notification.id);
  };

  const handleReject = (notification) => {
    addNotification({
      type: 'error',
      title: '신청 거절 완료',
      message: `${notification.userName}님의 신청을 거절했습니다.`,
      duration: 4000
    });
    removeNotification(notification.id);
  };

  const handleView = (notification) => {
    addNotification({
      type: 'info',
      title: '상세보기',
      message: `${notification.userName}님의 프로필을 확인했습니다.`,
      duration: 3000
    });
  };

  // 데모용 알림 생성 함수들
  const showApplicationNotification = () => {
    addNotification({
      type: 'application',
      title: '새로운 신청서가 도착했습니다',
      message: '김시연님이 "React 프론트엔드 개발자 모집" 공고에 지원하셨습니다.',
      userName: '김시연',
      category: '웹 개발',
      showActions: true,
      autoClose: false
    });
  };

  const showApprovalNotification = () => {
    addNotification({
      type: 'success',
      title: '🎉 지원 결과 알림',
      message: '축하합니다! "UX/UI 디자이너 모집" 공고에 합격하셨습니다.',
      category: '디자인',
      autoClose: false
    });
  };

  const showRejectionNotification = () => {
    addNotification({
      type: 'error',
      title: '지원 결과 알림',
      message: '아쉽게도 이번 "백엔드 개발자 모집"에는 선발되지 않으셨습니다.',
      category: '백엔드',
      autoClose: false
    });
  };

  const showWarningNotification = () => {
    addNotification({
      type: 'warning',
      title: '⏰ 마감 임박 알림',
      message: '지원하신 공고의 모집 마감일이 3일 남았습니다.',
      duration: 6000
    });
  };

  const showInfoNotification = () => {
    addNotification({
      type: 'info',
      title: '시스템 업데이트',
      message: '새로운 기능이 추가되었습니다. 확인해보세요!',
      duration: 4000
    });
  };

  const showMultipleNotifications = () => {
    setTimeout(() => showApplicationNotification(), 0);
    setTimeout(() => showApprovalNotification(), 500);
    setTimeout(() => showWarningNotification(), 1000);
  };

  return (
    <PageWrapper>
      <ContentContainer>
        <Header>
          <Title>
            <Bell size={40} />
            알림창 UI 컴포넌트
          </Title>
          <Subtitle>
            기존 디자인과 완벽하게 어울리는 알림 시스템을 확인해보세요
          </Subtitle>
        </Header>

        <DemoGrid>
          <DemoCard>
            <CardTitle>
              <Users size={20} />
              작성자용 알림
            </CardTitle>
            <DemoButton onClick={showApplicationNotification}>
              <Users size={18} />
              새 신청서 도착
            </DemoButton>
            <DemoButton onClick={() => addNotification({
              type: 'success',
              title: '승인 처리 완료',
              message: '신청자에게 승인 알림을 발송했습니다.',
              duration: 4000
            })}>
              <CheckCircle size={18} />
              승인 완료 알림
            </DemoButton>
            <DemoButton onClick={() => addNotification({
              type: 'error',
              title: '처리 실패',
              message: '네트워크 오류로 요청을 처리할 수 없습니다.',
              duration: 5000
            })}>
              <XCircle size={18} />
              오류 알림
            </DemoButton>
          </DemoCard>

          <DemoCard>
            <CardTitle>
              <Bell size={20} />
              신청자용 알림
            </CardTitle>
            <DemoButton onClick={showApprovalNotification}>
              <CheckCircle size={18} />
              합격 알림
            </DemoButton>
            <DemoButton onClick={showRejectionNotification}>
              <XCircle size={18} />
              불합격 알림
            </DemoButton>
            <DemoButton onClick={showWarningNotification}>
              <AlertCircle size={18} />
              마감 임박 알림
            </DemoButton>
          </DemoCard>

          <DemoCard>
            <CardTitle>
              <Info size={20} />
              시스템 알림
            </CardTitle>
            <DemoButton onClick={showInfoNotification}>
              <Info size={18} />
              정보 알림
            </DemoButton>
            <DemoButton onClick={showMultipleNotifications}>
              <Bell size={18} />
              여러 알림 한번에
            </DemoButton>
            <DemoButton onClick={() => {
              // 모든 알림 제거
              setNotifications([]);
            }}>
              <X size={18} />
              모든 알림 지우기
            </DemoButton>
          </DemoCard>
        </DemoGrid>

        {/* 알림 컨테이너 */}
        <NotificationContainer>
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              notification={notification}
              onClose={removeNotification}
              onApprove={handleApprove}
              onReject={handleReject}
              onView={handleView}
            />
          ))}
        </NotificationContainer>
      </ContentContainer>
    </PageWrapper>
  );
};

export default NotificationDemo;