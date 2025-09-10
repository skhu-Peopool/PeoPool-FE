import { Calendar, UserSearch, Users, Menu, X } from "lucide-react";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { LogOutIcon } from "lucide-react";
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  animation: ${slideDown} 0.5s ease-out;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  @media (max-width: 640px) {
    padding: 0 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-1px) scale(1.05);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }
`;

const LogoText = styled.a`
  font-size: 1.25rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1f2937, #374151);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const DesktopNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #eff6ff, #dbeafe)"
      : "transparent"};
  
  color: ${(props) => (props.active ? "#2563eb" : "#6b7280")};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #3b82f6, #2563eb)"
        : "linear-gradient(135deg, #f8fafc, #f1f5f9)"};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: ${(props) => (props.active ? "#1d4ed8" : "#374151")};

    &::before {
      opacity: ${(props) => (props.active ? "0.1" : "1")};
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const DesktopUserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserProfile = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.3rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border: 1px solid rgba(226, 232, 240, 0.8);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    border-color: rgba(203, 213, 225, 0.9);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
  box-shadow: 0 2px 8px rgba(96, 165, 250, 0.3);
`;

const UserInfo = styled.div`
  text-align: left;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #1f2937;
  line-height: 1.2;
`;

const UserRole = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const AuthButton = styled.button`
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.primary
      ? `
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
        box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);

        &:hover {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }
      `
      : `
        background: transparent;
        color: #6b7280;
        border: 1px solid rgba(229, 231, 235, 0.8);

        &:hover {
          background: rgba(248, 250, 252, 0.8);
          color: #374151;
          border-color: rgba(203, 213, 225, 0.9);
        }
      `}

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(248, 250, 252, 0.8);
    color: #374151;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.2s ease-out;
  z-index: 50;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
  }
`;

const MobileMenuContent = styled.div`
  padding: 1rem 1.5rem;
`;

const MobileNavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;

  background: ${(props) =>
    props.active ? "rgba(59, 130, 246, 0.1)" : "transparent"};
  color: ${(props) => (props.active ? "#2563eb" : "#6b7280")};

  &:hover {
    background: ${(props) =>
      props.active ? "rgba(59, 130, 246, 0.15)" : "rgba(248, 250, 252, 0.8)"};
    color: ${(props) => (props.active ? "#1d4ed8" : "#374151")};
  }
`;

const MobileUserSection = styled.div`
  border-top: 1px solid rgba(229, 231, 235, 0.5);
  padding-top: 1rem;
  margin-top: 1rem;
`;

const ContentPadding = styled.div`
  padding-top: 4rem;
`;

const HeaderSlide = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      alert(e, "로그아웃에 실패했습니다.");
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
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Header>
        <Container>
          <Nav>
            <LogoSection>
              <LogoIcon>
                <Users size={18} />
              </LogoIcon>
              <LogoText href="/">peopool</LogoText>
            </LogoSection>

            <DesktopNav>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;

                return (
                  <NavItem
                    key={item.path}
                    active={isActive}
                    onClick={() => navigate(item.path)}
                  >
                    <Icon size={16} />
                    <span>{item.text}</span>
                  </NavItem>
                );
              })}
            </DesktopNav>

            <UserSection>
              <DesktopUserSection>
                {user ? (
                  <>
                    <UserProfile onClick={() => navigate("/profile")}>
                      <UserAvatar>
                        {user.nickname ? user.nickname[0] : "U"}
                      </UserAvatar>
                      <UserInfo>
                        <UserName>{user.nickname || "사용자"}</UserName>
                        <UserRole>회원</UserRole>
                      </UserInfo>
                    </UserProfile>
                    <AuthButton onClick={handleLogout}><LogOutIcon size={18}/></AuthButton>
                  </>
                ) : (
                  <AuthButton primary onClick={() => navigate("/signIn")}>
                    로그인 하기
                  </AuthButton>
                )}
              </DesktopUserSection>

              <MobileMenuButton
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </MobileMenuButton>
            </UserSection>
          </Nav>
        </Container>
        <MobileMenu isOpen={isMobileMenuOpen}>
          <MobileMenuContent>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;

              return (
                <MobileNavItem
                  key={item.path}
                  active={isActive}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon size={18} />
                  <span>{item.text}</span>
                </MobileNavItem>
              );
            })}

            <MobileUserSection>
              {user ? (
                <>
                  <MobileNavItem onClick={() => handleNavigation("/profile")}>
                    <UserAvatar>
                      {user.nickname ? user.nickname[0] : "U"}
                    </UserAvatar>
                    <div>
                      <UserName>{user.nickname || "사용자"}</UserName>
                      <UserRole>회원</UserRole>
                    </div>
                  </MobileNavItem>
                  <AuthButton
                    onClick={handleLogout}
                    style={{ width: "100%", marginTop: "0.5rem" }}
                  >
                    로그아웃
                  </AuthButton>
                </>
              ) : (
                <AuthButton
                  primary
                  onClick={() => handleNavigation("/signIn")}
                  style={{ width: "100%" }}
                >
                  로그인 하기
                </AuthButton>
              )}
            </MobileUserSection>
          </MobileMenuContent>
        </MobileMenu>
      </Header>
      <ContentPadding />
    </>
  );
};

export default HeaderSlide;