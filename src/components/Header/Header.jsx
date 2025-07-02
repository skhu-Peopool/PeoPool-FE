import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Overlay,
  Sidebar,
  Content,
  LogoWrapper,
  Logo,
  NavList,
  AuthList,
  StyledLink,
} from "./Header.styles";

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX < 20) setIsOpen(true);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseLeave = () => setIsOpen(false);

  const navItems = [
    { name: "커뮤니티", to: "/community" },
    { name: "마이페이지", to: "/mypage" },
  ];

  const authItems = [
    { name: "로그인", to: "/signIn" },
    { name: "회원가입", to: "/signup" },
  ];

  return (
    <>
      {isOpen && <Overlay />}
      <Sidebar isOpen={isOpen} onMouseLeave={handleMouseLeave}>
        <Content>
          <LogoWrapper>
            <Link to="/" onClick={handleMouseLeave}>
              <Logo src="/Logo.svg" alt="로고" />
            </Link>
          </LogoWrapper>

          <NavList>
            {navItems.map((item) => {
              const isClick = pathname.startsWith(item.to);
              return (
                <li key={item.name}>
                  <StyledLink
                    to={item.to}
                    onClick={handleMouseLeave}
                    $active={isClick}
                  >
                    {item.name}
                  </StyledLink>
                </li>
              );
            })}
          </NavList>

          <AuthList>
            {authItems.map((item) => {
              const isClick = pathname === item.to;
              return (
                <li key={item.name}>
                  <StyledLink
                    to={item.to}
                    onClick={handleMouseLeave}
                    $active={isClick}
                    $small
                  >
                    {item.name}
                  </StyledLink>
                </li>
              );
            })}
          </AuthList>
        </Content>
      </Sidebar>
    </>
  );
}
