import LoginHeader from "./component/login-header";
import LoginForm from "./component/login-form";

export default function Login() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm border border-border p-8">
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  );
}
