import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";

export default function Layout() {
  const location = useLocation();

  const hideHeaderRoutes = ["/", "/signIn", "/signUp"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideHeader && <Header />}
      <main style={{ paddingTop: !shouldHideHeader ? "60px" : 0 }}>
        <Outlet />
      </main>
    </div>
  );
}
