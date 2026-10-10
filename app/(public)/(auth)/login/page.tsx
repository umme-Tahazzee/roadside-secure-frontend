// biome-ignore assist/source/organizeImports: <explanation>
import { LoginForm } from "@/components/module/auth/login/LoginForm"
import Logo from "@/utils/logo"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center  bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <div className="flex items-center gap-2 self-center font-medium">
          <Logo className="" imageClassName="h-28 w-full"/>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
