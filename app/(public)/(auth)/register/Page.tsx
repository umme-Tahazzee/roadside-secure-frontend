

import img from '@/app/assests/img/auth/login.png'
import Image from "next/image"
import Logo from "@/utils/logo"
import { SignupForm } from "@/components/module/auth/SignUp/SignUpFrom"



export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          
          <Logo className="mt-2"  imageClassName="h-30 w-fit"/>    
         
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={img}
          alt="Roadsite image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
