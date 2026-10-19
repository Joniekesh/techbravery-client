import { useMemo, useState, type SyntheticEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  CircleCheck,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { publicRequest } from "@/utils/makeRequest";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { resetToken } = useParams<{ resetToken: string }>();

  const passwordRequirements = useMemo(
    () => ({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }),
    [password],
  );

  const passwordScore =
    Object.values(passwordRequirements).filter(Boolean).length;

  const passwordStrength =
    passwordScore === 0
      ? ""
      : passwordScore === 1
        ? "Very weak"
        : passwordScore === 2
          ? "Weak"
          : passwordScore === 3
            ? "Fair"
            : passwordScore === 4
              ? "Good"
              : "Strong";

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const isPasswordValid = passwordScore === 5;
  const canSubmit =
    Boolean(resetToken) && isPasswordValid && passwordsMatch && !loading;

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!resetToken) {
      toast.error("Invalid or missing password reset token.");
      return;
    }

    if (!password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (!isPasswordValid) {
      toast.error("Please make sure your password meets all the requirements.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await publicRequest.put(
        `/auth/reset-password/${resetToken}`,
        {
          password,
        },
      );

      if (res.status >= 200 && res.status < 300) {
        toast.success(
          res.data?.message || "Your password has been reset successfully.",
        );

        navigate("/login", { replace: true });
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const requirementItems = [
    {
      label: "At least 8 characters",
      valid: passwordRequirements.minLength,
    },
    {
      label: "One uppercase letter",
      valid: passwordRequirements.uppercase,
    },
    {
      label: "One lowercase letter",
      valid: passwordRequirements.lowercase,
    },
    {
      label: "One number",
      valid: passwordRequirements.number,
    },
    {
      label: "One special character",
      valid: passwordRequirements.special,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:py-16 lg:py-20">
        <div className="w-full max-w-md">
          <Card className="overflow-hidden border-border/60 shadow-xl shadow-primary/5">
            <div className="h-1.5 bg-linear-to-r from-primary-dark via-primary to-primary-glow" />

            <CardHeader className="space-y-5 pb-6 pt-7 sm:pt-8">
              <div className="flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5">
                  <KeyRound className="h-7 w-7" />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Secure password recovery
                </div>

                <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Reset Password
                </CardTitle>

                <CardDescription className="mx-auto max-w-sm text-sm leading-6">
                  Create a strong new password for your account. Make sure your
                  password is something only you can remember.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-5 pb-7 sm:px-7 sm:pb-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password">New password</Label>

                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pl-10 pr-11"
                      autoComplete="new-password"
                      disabled={loading}
                      required
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {password.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-1 gap-1">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <div
                              key={index}
                              className={`h-1.5 flex-1 rounded-full transition-all ${
                                index < passwordScore
                                  ? "bg-primary"
                                  : "bg-muted"
                              }`}
                            />
                          ))}
                        </div>

                        <span className="text-xs font-medium text-muted-foreground">
                          {passwordStrength}
                        </span>
                      </div>

                      <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
                        <p className="mb-2 text-xs font-medium text-muted-foreground">
                          Password requirements
                        </p>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {requirementItems.map((requirement) => (
                            <div
                              key={requirement.label}
                              className={`flex items-center gap-2 text-xs ${
                                requirement.valid
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {requirement.valid ? (
                                <CircleCheck className="h-3.5 w-3.5 shrink-0" />
                              ) : (
                                <CircleAlert className="h-3.5 w-3.5 shrink-0" />
                              )}

                              <span>{requirement.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm new password</Label>

                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`h-11 pl-10 pr-11 ${
                        confirmPassword.length > 0
                          ? passwordsMatch
                            ? "border-primary focus-visible:ring-primary"
                            : "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                      autoComplete="new-password"
                      disabled={loading}
                      required
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      disabled={loading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {confirmPassword.length > 0 && (
                    <div
                      className={`flex items-center gap-1.5 text-xs ${
                        passwordsMatch ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {passwordsMatch ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <CircleAlert className="h-3.5 w-3.5" />
                      )}

                      <span>
                        {passwordsMatch
                          ? "Passwords match"
                          : "Passwords do not match"}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full bg-linear-to-r from-primary to-primary-glow font-semibold shadow-md shadow-primary/10 transition-all hover:shadow-lg hover:shadow-primary/20"
                  disabled={!canSubmit}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Resetting password...
                    </span>
                  ) : (
                    <>
                      <KeyRound className="mr-2 h-4 w-4" />
                      Reset password
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 border-t border-border/60 pt-5">
                <Link
                  to="/login"
                  className="group flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                  Back to sign in
                </Link>
              </div>

              <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border/50 bg-muted/30 p-3.5">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <p className="text-xs leading-5 text-muted-foreground">
                  Your new password should be unique and should not be reused
                  across other services.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
