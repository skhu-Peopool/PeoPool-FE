import { Calendar, UserSearch, Users } from "lucide-react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${(props) => (props.open ? "17.5rem" : "0")};
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: ${(props) => (props.open ? "0 8px 40px rgba(0, 0, 0, 0.08)" : "none")};
  overflow: hidden;
  transition: width 0.3s ease, padding 0.3s ease;
  white-space: nowrap;
  z-index: 1000;
  padding: ${(props) => (props.open ? "1.5rem" : "0")};
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.3);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: opacity 0.3s ease;
  color: #1e293b;
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: #3b82f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const MenuSection = styled.div`
  margin-bottom: 2rem;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 0.25rem;
  transition: all 0.2s ease;
  color: ${(props) => (props.active ? "#3b82f6" : "#64748b")};
  background: ${(props) => (props.active ? "rgba(59, 130, 246, 0.08)" : "transparent")};
  font-weight: ${(props) => (props.active ? "600" : "500")};

  &:hover {
    background: ${(props) => (props.active ? "rgba(59, 130, 246, 0.12)" : "rgba(248, 250, 252, 0.8)")};
    color: ${(props) => (props.active ? "#2563eb" : "#475569")};
    transform: translateX(2px);
  }
`;

const MenuText = styled.span`
  flex: 1;
  font-size: 0.9rem;
`;

const MenuBadge = styled.span`
  background: ${(props) => (props.active ? "#3b82f6" : "#e2e8f0")};
  color: ${(props) => (props.active ? "white" : "#64748b")};
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 1.5rem;
  text-align: center;
`;

const AuthSection = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
`;

const LogOut = styled.div`
  padding: 0.875rem 1rem;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(248, 250, 252, 0.8);
    color: #475569;
  }
`;

const LogIn = styled.div`
  padding: 0.875rem 1rem;
  background: #3b82f6;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  text-align: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #2563eb;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;

  &:hover {
    background: rgba(241, 245, 249, 0.9);
    border-color: rgba(203, 213, 225, 0.8);
    transform: translateY(-1px);
  }
`;

const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserNameProfile = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const UserRole = styled.div`
  font-size: 0.75rem;
  color: #64748b;
`;

const BookmarkToggle = styled.button`
  position: fixed;
  top: 6rem;
  left: ${(props) => (props.open ? "17.5rem" : "0")};
  width: 1.5rem;
  height: 9rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 232, 240, 0.5);
  border-left: none;
  border-radius: 0 12px 12px 0;
  color: #64748b;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  &:hover {
    background: rgba(248, 250, 252, 0.98);
    color: #3b82f6;
    transform: translateX(2px);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);
  }
`;

const HeaderSlide = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const currentPath = location.pathname;

  const handleLogout = async () => {
    try {
      await logout();
      alert("성공적으로 처리되었습니다.");
      navigate("/");
    } catch (e) {
      alert(e,"로그아웃에 실패했습니다.");
    }
  };

  const menuItems = [
    {
      path: "/community",
      icon: Users,
      text: "Community",
    },
    {
      path: "/others",
      icon: UserSearch,
      text: "사람찾기",
    },
    {
      path: "/calendar",
      icon: Calendar,
      text: "달력/시간표",
    }
  ];

  return (
    <>
      <Sidebar open={open}>
        {open && (
          <>
            <LogoContainer>
              <Logo open={open}>
                <LogoIcon>
                  <Users size={20} />
                </LogoIcon>
                <a href="/">peopool</a>
              </Logo>
            </LogoContainer>

            <MenuSection>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                
                return (
                  <MenuItem
                    key={item.path}
                    active={isActive}
                    onClick={() => navigate(item.path)}
                  >
                    <Icon size={18} />
                    <MenuText>{item.text}</MenuText>
                  </MenuItem>
                );
              })}
            </MenuSection>

            <AuthSection>
              {user ? (
                <>
                  <UserProfile onClick={() => navigate("/profile")}>
                    <UserAvatar>
                      {user.nickname ? user.nickname[0] : "U"}
                    </UserAvatar>
                    <UserDetails>
                      <UserNameProfile>{user.nickname || "사용자"}</UserNameProfile>
                      <UserRole>회원</UserRole>
                    </UserDetails>
                  </UserProfile>
                  <LogOut onClick={handleLogout}>
                    로그아웃
                  </LogOut>
                </>
              ) : (
                <LogIn onClick={() => navigate("/signIn")}>
                  로그인 하기
                </LogIn>
              )}
            </AuthSection>
          </>
        )}
      </Sidebar>

      <BookmarkToggle open={open} onClick={() => setOpen(!open)}>
        {open ? "‹" : "›"}
      </BookmarkToggle>
      <div
        style={{
          marginLeft: open ? "17.5rem" : "0",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
        }}
      ></div>
    </>
  );
};

export default HeaderSlide;