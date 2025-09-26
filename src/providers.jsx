import AuthProvider from "./providers/AuthProvider";
import { NotificationProvider } from "./providers/NotificationProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </AuthProvider>
  );
}
