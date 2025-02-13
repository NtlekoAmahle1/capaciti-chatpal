
import { AuthTabs } from "@/components/auth/AuthTabs";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-capaciti-navy via-capaciti-navy-light to-capaciti-red/10 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl">
          <AuthTabs />
        </div>
      </div>
    </div>
  );
};

export default Auth;
