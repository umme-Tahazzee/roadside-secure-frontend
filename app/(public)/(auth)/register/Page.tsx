import { SignupForm } from "@/components/module/auth/SignUp/SignUpFrom";
import Logo from "@/utils/logo";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div
       
        className="flex items-center gap-2 self-center font-medium"
      >
        <Logo className="" imageClassName="h-28 w-full" />
      </div>
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
