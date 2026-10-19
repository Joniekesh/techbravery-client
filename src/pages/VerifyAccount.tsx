import { Button } from "@/components/ui/button";
import { clearAuth } from "@/redux/slices/authSlices";
import { useAppDispatch } from "@/redux/hooks";
import { getErrorMessage } from "@/utils/getErrorMessage";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState, type SyntheticEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { publicRequest } from "@/utils/makeRequest";
import OtpInput from "@/components/OtpInput";

interface VerifyLocationState {
  email?: string;
  userId?: string;
}
const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const [clicked, setClicked] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = (location.state as VerifyLocationState | null) ?? null;
  const email = state?.email ?? "";

  useEffect(() => {
    if (!email) {
      toast.error(
        "Verification session not found. Please register or sign in again.",
      );
      navigate("/login", { replace: true });
    }
  }, [email, navigate]);

  const handleVerify = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (clicked) {
      return;
    }

    if (!email) {
      toast.error("Verification email is missing. Please start again.");
      return;
    }

    if (otp.length !== 6) {
      toast.warning("Please enter the complete 6-digit verification code.");
      return;
    }

    setClicked(true);
    try {
      const res = await publicRequest.put("/auth/email/verify", { email, otp });
      if (res.status === 200) {
        toast.success(res.data?.message || "Email verified successfully.");
        dispatch(clearAuth());
        navigate("/login", { replace: true });
      }
    } catch (err: any) {
      console.error("Email verification failed:", err);
      toast.error(getErrorMessage(err));
    } finally {
      setClicked(false);
    }
  };

  const handleResendCode = async () => {
    if (loadingResend || clicked) {
      return;
    }

    if (!email) {
      toast.error("Verification email is missing. Please start again.");
      return;
    }

    setLoadingResend(true);
    try {
      const res = await publicRequest.put("/auth/email/verify/otp/resend", {
        email,
      });
      if (res.status === 200) {
        toast.success(
          res.data?.message || "A new verification code has been sent.",
        );
        setOtp("");
      }
    } catch (err: any) {
      console.error("Resending verification code failed:", err);
      toast.error(getErrorMessage(err));
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-background via-background to-accent/20 px-4 py-10 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      </div>
      <main className="relative z-10 w-full max-w-md">
        {/* Brand / security indicator */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Secure account verification</span>
          </div>
        </div>
        {/* Main card */}
        <div className="overflow-hidden rounded-2xl border bg-card shadow-xl shadow-black/5">
          {/* Top accent */}
          <div className="h-1.5 w-full bg-linear-to-r from-primary via-primary-glow to-primary" />
          <div className="p-6 sm:p-8">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-8 ring-primary/5">
                <MailCheck className="h-8 w-8 text-primary" />
              </div>
            </div>
            {/* Heading */}
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Verify your email
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
                We've sent a 6-digit verification code to
              </p>
              {/* Email */}
              <div className="mx-auto mt-3 max-w-full">
                <span className="inline-block max-w-full truncate rounded-lg bg-muted px-3 py-1.5 text-sm font-semibold text-foreground">
                  {email || "your email address"}
                </span>
              </div>
            </div>
            {/* Verification instructions */}
            <div className="mt-7 rounded-xl border border-border/70 bg-muted/40 p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">
                    Enter your verification code
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Enter the 6-digit code from your email to complete your
                    registration. The code may expire after a limited period.
                  </p>
                </div>
              </div>
            </div>
            {/* Form */}
            <form onSubmit={handleVerify} className="mt-7">
              {/* OTP */}
              <div className="flex justify-center overflow-x-auto py-2">
                <OtpInput
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                  }}
                />
              </div>
              {/* OTP status */}
              <div className="mt-3 min-h-5 text-center">
                {otp.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {otp.length}/6 digits entered
                  </p>
                )}
              </div>
              {/* Verify */}
              <Button
                type="submit"
                size="lg"
                disabled={clicked || loadingResend || otp.length !== 6}
                className="mt-5 h-12 w-full bg-linear-to-r from-primary to-primary-glow font-semibold shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {clicked ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </form>
            {/* Resend section */}
            <div className="mt-7 border-t pt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?
              </p>
              <Button
                type="button"
                variant="ghost"
                disabled={loadingResend || clicked || !email}
                onClick={handleResendCode}
                className="mt-1 h-auto px-2 py-1 text-sm font-semibold text-primary hover:bg-primary/5 hover:text-primary"
              >
                {loadingResend ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Resending code...
                  </span>
                ) : (
                  "Resend new code"
                )}
              </Button>
            </div>
            {/* Login */}
            <div className="mt-5 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" /> Sign in with another account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default VerifyAccount;
