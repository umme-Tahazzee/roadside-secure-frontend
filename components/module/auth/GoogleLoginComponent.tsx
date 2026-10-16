import { toast } from "@/components/ui/toast";
import { useGoogleAuth } from "@/hooks";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React from "react";

export default function GoogleLoginComponent() {
  const { mutate: googleLogin } = useGoogleAuth();

  const router = useRouter();

  const handleGoogleSuccess = (
    credentialResponse: GoogleCredentialResponse,
  ) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Google OAuth Login Successfully",
            description: "Welcome back",
            type: "success",
          });
          router.push("/");
        },
        onError: () => {
          toast.add({
            title: "Google OAuth Failed",
            description: "Something went wrong",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Something went wrong",
      type: "error",
    });
  };

  return (
    <div>
      <GoogleLogin
        theme="outline"
        shape="circle"
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>
  );
}
