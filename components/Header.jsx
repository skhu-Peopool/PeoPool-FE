"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // 전역 마우스 감지
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX < 20) {
        setIsOpen(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseLeave = () => setIsOpen(false);

  // 로그인/회원가입/랜딩 페이지에서는 Header 숨김
  if (pathname === "/signIn" || pathname === "/signup" || pathname === "/") {
    return null;
  }

  const navItems = [
    { name: "커뮤니티", href: "/community" },
    { name: "마이페이지", href: "/mypage" },
  ];

  const authItems = [
    { name: "로그인", href: "/signIn" },
    { name: "회원가입", href: "/signup" },
  ];

  return (
    <>
      {/* 어두운 배경 */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-transparent backdrop-brightness-75 transition-all duration-500 ease-in-out" />
      )}

      {/* 슬라이드 헤더 */}
      <aside
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start">
          {/* 위쪽: 로고 + 메뉴 */}
          <div className="mb-10">
            <Link
              href="/"
              onClick={handleMouseLeave}
              className="block pt-5 pl-1"
            >
              <Image
                src="/Logo.svg"
                alt="로고1"
                width={130}
                height={130}
                className="block"
              />
            </Link>

            {/* 메뉴 */}
            <nav>
              <ul className="flex flex-col gap-4 px-8 font-bold text-lg">
                {navItems.map((item) => {
                  const isClick = pathname.startsWith(item.href);
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`transition ${
                          isClick ? "text-blue-500" : "text-gray-600"
                        } hover:text-blue-500`}
                        onClick={handleMouseLeave}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="h-100" />

          {/* 로그인, 회원가입 */}
          <nav>
            <ul className="flex flex-col gap-3 px-8 font-bold text-sm">
              {authItems.map((item) => {
                const isClick = pathname === item.href;
                return (
                  <li key={item.name} className="flex items-center">
                    <Link
                      href={item.href}
                      className={`transition ${
                        isClick ? "text-blue-500" : "text-gray-600"
                      } hover:text-blue-500`}
                      onClick={handleMouseLeave}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
