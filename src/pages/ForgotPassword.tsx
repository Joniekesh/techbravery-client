import { useState, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, KeyRound, Loader2, Mail, ShieldCheck } from "lucide-react";
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

import { getErrorMessage } from "@/utils/getErrorMessage";
import { publicRequest } from "@/utils/makeRequest";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.error("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const res = await publicRequest.post("/auth/forgot-password", {
        email: normalizedEmail,
      });
      toast.success(
        res?.data?.message ||
          "If an account exists with this email, recovery instructions have been sent.",
      );
      setEmail("");
    } catch (error) {
      console.error("Forgot password request failed:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
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
        {/* Security badge */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Secure password recovery</span>
          </div>
        </div>
        {/* Card */}
        <Card className="overflow-hidden border shadow-xl shadow-black/5">
          {/* Top accent */}
          <div className="h-1.5 w-full bg-linear-to-r from-primary via-primary-glow to-primary" />
          <CardHeader className="px-6 pt-7 sm:px-8 sm:pt-8">
            {/* Icon */}
            <div className="mb-5 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-8 ring-primary/5">
                <KeyRound className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Forgot your password?
            </CardTitle>
            <CardDescription className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 sm:text-base">
              Enter the email address associated with your account and we'll
              send you instructions to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
            {/* Information message */}
            <div className="mb-6 rounded-xl border border-primary/10 bg-primary/5 p-4">
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium"> Check your email </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    We'll send a password recovery link if an account is
                    associated with the email address you provide.
                  </p>
                </div>
              </div>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email"> Email address </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 pl-10"
                    disabled={loading}
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="h-12 w-full bg-linear-to-r from-primary to-primary-glow font-semibold shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending recovery link...
                  </span>
                ) : (
                  "Send Recovery Link"
                )}
              </Button>
            </form>
            {/* Back to login */}
            <div className="mt-7 border-t pt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" /> Remembered your password? Sign
                in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
export default ForgotPassword;
