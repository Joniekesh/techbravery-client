import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { publicRequest } from "@/utils/makeRequest";

import {
  loginChallenge,
  loginFailure,
  loginRequest,
  loginSuccess,
} from "@/redux/slices/authSlices";

import { AuthUser } from "@/types/user";
import SocialLoginButtons from "@/components/shared/SocialLoginButtons";

import SEOHead from "@/components/SEOHead";
import { getDefaultDashboard } from "@/utils/getDefaultDashboard";

type SocialProvider = "google" | "apple" | null;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider>(null);

  const auth = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const getLoginRedirect = (authenticatedUser: AuthUser): string => {
    if (location.state?.from) {
      const from = location.state.from;

      if (typeof from === "string") {
        return from;
      }

      if (from.pathname) {
        return from.pathname + (from.search || "") + (from.hash || "");
      }
    }

    const storedRedirect = sessionStorage.getItem("redirectAfterLogin");

    if (storedRedirect) {
      sessionStorage.removeItem("redirectAfterLogin");
      return storedRedirect;
    }

    return getDefaultDashboard(authenticatedUser);
  };

  useEffect(() => {
    if (!auth.user) return;

    const from = location.state?.from;

    if (typeof from === "string") {
      navigate(from, { replace: true });
      return;
    }

    if (from?.pathname) {
      navigate(`${from.pathname}${from.search || ""}${from.hash || ""}`, {
        replace: true,
      });
      return;
    }

    const storedRedirect = sessionStorage.getItem("redirectAfterLogin");

    if (storedRedirect) {
      sessionStorage.removeItem("redirectAfterLogin");
      navigate(storedRedirect, { replace: true });
      return;
    }

    navigate(getDefaultDashboard(auth.user), { replace: true });
  }, [auth.user, location.state, navigate]);

  useEffect(() => {
    return () => {
      dispatch(loginChallenge());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.warning("Email and password are required.");
      return;
    }

    dispatch(loginRequest());

    try {
      const res = await publicRequest.post("/auth/login", {
        email: email.trim(),
        password,
        app: "CLIENT",
      });

      const data = res.data;

      if (data.code === "EMAIL_NOT_VERIFIED") {
        dispatch(loginChallenge());

        navigate("/verify", {
          state: {
            userId: data.userId,
            email: data.email,
          },
        });

        toast.info("Please verify your email.");
        return;
      }

      if (data.code === "TWO_FA_REQUIRED") {
        navigate("/verify", {
          state: {
            userId: data.userId,
            email: data.email,
          },
        });

        toast.info("Enter your 2FA code.");
        return;
      }

      if (data.code === "LOGIN_SUCCESS" && data.user) {
        const authenticatedUser = data.user as AuthUser;

        dispatch(loginSuccess(authenticatedUser));

        const destination = getLoginRedirect(authenticatedUser);

        sessionStorage.removeItem("redirectAfterLogin");

        navigate(destination, { replace: true });

        toast.success("Login successful.");
        return;
      }

      toast.error("Unable to complete login.");
    } catch (err) {
      toast.error(getErrorMessage(err));
      dispatch(loginFailure(err || "Login failed"));

      console.error("Login failed:", err);
    }
  };

  const handleSocialLogin = async (provider: Exclude<SocialProvider, null>) => {
    if (auth.isLoading || socialLoading) return;

    setSocialLoading(provider);

    try {
      toast.info(
        `${provider === "google" ? "Google" : "Apple"} login will be connected soon.`,
      );
    } catch (err) {
      console.error(`${provider} authentication failed:`, err);
      toast.error(getErrorMessage(err));
    } finally {
      setSocialLoading(null);
    }
  };

  const isBusy = auth.isLoading || socialLoading !== null;

  return (
    <>
      <SEOHead
        title="Login | TechBravery"
        description="Sign in to your TechBravery account."
        url="/login"
        noindex
      />

      <main className="box-border flex h-dvh w-full flex-col items-center justify-center overflow-y-auto bg-gradient-to-br from-background via-background to-accent/20 px-4 py-2 sm:px-6">
        <div className="mx-auto flex w-full max-w-md shrink-0 items-center">
          <Card className="w-full border-0 bg-linear-to-br from-card to-accent/10 shadow-2xl">
            <CardHeader className="space-y-0.5 px-5 pb-2 pt-3 sm:px-8 sm:pb-3 sm:pt-4">
              <CardTitle className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome Back
              </CardTitle>

              <CardDescription className="text-center text-sm leading-tight">
                Sign in to continue to your account.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5 pb-3 sm:px-8 sm:pb-4">
              <SocialLoginButtons
                onProviderClick={handleSocialLogin}
                loadingProvider={socialLoading}
                disabled={auth.isLoading}
                showDivider
                dividerText="Or continue with email"
                layout="grid"
              />

              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 pl-10 transition-all focus-visible:ring-primary"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-medium text-primary transition-colors hover:text-primary-glow hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pl-10 pr-11 transition-all focus-visible:ring-primary"
                      autoComplete="current-password"
                      required
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={auth.isLoading}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isBusy}
                  className="h-11 w-full bg-gradient-to-r from-primary via-primary-glow to-primary font-semibold shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {auth.isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-3 border-t border-border/60 pt-2.5 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-primary transition-colors hover:text-primary-glow hover:underline"
                  >
                    Create an account
                  </Link>
                </p>
              </div>

              <div className="mt-2 flex items-center justify-center gap-2 text-center text-[11px] leading-tight text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                <span>Secure authentication protects your account.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Login;
