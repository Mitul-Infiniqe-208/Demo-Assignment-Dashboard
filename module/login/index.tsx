import LoginHeader from "./components/login-header";
import LoginForm from "./components/login-form";
import { FlexRow } from "@/components/common/flex-row";

export default function Login() {
  return (
    <FlexRow
      align="center"
      justify="center"
      className="min-h-screen w-full bg-background px-6"
    >
      <div className="w-full max-w-sm border border-border p-8">
        <LoginHeader />
        <LoginForm />
      </div>
    </FlexRow>
  );
}
