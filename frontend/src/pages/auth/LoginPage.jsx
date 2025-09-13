import { LoginForm } from "../../components/auth/LoginForm";
import { RegisterForm } from "../../components/auth/RegisterForm";

export const LoginPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/20" />
          <div className="z-10 w-full max-w-md px-4">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground">Hi, welcome back</h1>
              <p>We're glad to see again</p>
            </div>
            {/* Login form */}
          <LoginForm />
          </div>
      </div>
    </>
  );
};
