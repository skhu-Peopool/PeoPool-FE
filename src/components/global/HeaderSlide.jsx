import { Calendar, UserSearch, Users } from "lucide-react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import menubar from "../../assets/menubar.svg";

const Sidebar = styled.div`
  width: ${(props) => (props.open ? "17.5rem" : "0")};
  background: var(--color-gradient);
  color: white;
  padding: ${(props) => (props.open ? "1.5rem" : "0")};
  overflow: visible;
  transition: width 0.3s ease, padding 0.3s ease;
  position: relative;
  white-space: nowrap;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: bold;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.15)" : "transparent"};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MenuText = styled.span`
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
`;

const LogOut = styled.span`
  display: flex;
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 33rem;
  margin-left: 0.3rem;
`;

const LogIn = styled.span`
  display: flex;
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 37rem;
  margin-left: 1.25rem;
`;

const MenuBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const UserProfile = styled.div`
  position: absolute;
  width: 14.5rem;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  transition: all 0.2s;
  border-radius: 0.75rem;
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.15)" : "transparent"};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const UserAvatar = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: white;
  color: #73a3e7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserNameProfile = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.125rem;
`;

const BookmarkToggle = styled.button`
  position: absolute;
  top: 6rem;
  left: ${(props) => (props.open ? "17.55rem" : "0")};
  width: 1.5rem;
  height: 9rem;
  background: var(--color-primary);
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.3s ease;

  &:hover {
    opacity: 0.9;
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
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <Sidebar open={open}>
      <BookmarkToggle open={open} onClick={() => setOpen(!open)} />

      {open && (
        <>
          <LogoContainer>
            <Logo open={open}>
              <LogoIcon>
                <Users size={18} />
              </LogoIcon>
              <a href="/">peopool</a>
            </Logo>
          </LogoContainer>

          <MenuItem
            active={currentPath === "/community"}
            onClick={() => navigate("/community")}
          >
            <Users size={18} />
            <MenuText>Community</MenuText>
            <MenuBadge>0</MenuBadge>
          </MenuItem>
          <MenuItem
            active={currentPath === "/others"}
            onClick={() => navigate("/others")}
          >
            <UserSearch size={18} />
            <MenuText>사람찾기</MenuText>
            <MenuBadge>2</MenuBadge>
          </MenuItem>
          <MenuItem
            active={currentPath === "/calendar"}
            onClick={() => navigate("/calendar")}
          >
            <Calendar size={18} />
            <MenuText>달력/시간표</MenuText>
            <MenuBadge>1</MenuBadge>
          </MenuItem>

          {user ? (
            <>
              <LogOut onClick={handleLogout} style={{ cursor: "pointer" }}>
                로그아웃
              </LogOut>
              <UserProfile active onClick={() => navigate("/profile")}>
                <UserAvatar>JW</UserAvatar>
                <UserDetails>
                  <UserNameProfile>John W.</UserNameProfile>
                </UserDetails>
              </UserProfile>
            </>
          ) : (
            <LogIn
              onClick={() => navigate("/signIn")}
              style={{ cursor: "pointer" }}
            >
              로그인 하기
            </LogIn>
          )}
        </>
      )}
    </Sidebar>
  );
};

export default HeaderSlide;
