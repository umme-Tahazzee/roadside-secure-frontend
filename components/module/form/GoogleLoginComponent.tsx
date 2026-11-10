"use client";
import {
  type GoogleCredentialResponse,
  GoogleLogin,
} from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { userProfile } from "@/api";
import { dashboardForRole, safeNextPath } from "@/lib/redirect";
import { toast } from "@/components/ui/toast";
import { useGoogleAuth } from "@/hooks";

export default function GoogleLoginComponent() {
  const { mutate: googleLogin } = useGoogleAuth();

  const router = useRouter();
  const queryClient = useQueryClient();
  const nextPath = safeNextPath(useSearchParams().get("next"));

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
        onSuccess: async () => {
          toast.add({
            title: "Google OAuth Login Successfully",
            description: "Welcome back",
            type: "success",
          });
          let target = "/customer";
          try {
            const me = await queryClient.fetchQuery({
              queryKey: ["user"],
              queryFn: userProfile,
              staleTime: 0,
            });
            target = dashboardForRole(me.data.role);
          } catch {}
          router.push(nextPath !== "/" ? nextPath : target);
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
