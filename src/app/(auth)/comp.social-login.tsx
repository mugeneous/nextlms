import { loginWithGoogleAction } from "@/app/(auth)/action.social-login";
import { Button } from "@/components/button";

export const SocialLoginBtn = () => {
  return (
    <form action={loginWithGoogleAction}>
      <Button variant="secondary">Login with Google</Button>
    </form>
  );
};
