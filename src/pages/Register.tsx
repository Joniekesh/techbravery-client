import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronsUpDown,
  CircleAlert,
  CircleCheck,
  Eye,
  EyeOff,
  Loader,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
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

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { publicRequest } from "@/utils/makeRequest";
import SocialLoginButtons from "@/components/shared/SocialLoginButtons";

import CountrySelect, {
  type CountryOption,
} from "@/components/shared/CountrySelect";

import SEOHead from "@/components/SEOHead";

type SocialProvider = "google" | "apple" | null;

interface PasswordRequirements {
  minLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAppSelector((state) => state.auth);
  const user = auth.user;

  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null,
  );
  const [socialLoading, setSocialLoading] = useState<SocialProvider>(null);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    loading: false,
    step: 1,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    loading,
    step,
  } = state;

  const passwordRequirements = useMemo<PasswordRequirements>(
    () => ({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }),
    [password],
  );

  const passwordScore = useMemo(() => {
    return Object.values(passwordRequirements).filter(Boolean).length;
  }, [passwordRequirements]);

  const passwordStrength = useMemo(() => {
    if (!password) {
      return {
        label: "",
        textClass: "text-muted-foreground",
        barClass: "bg-muted",
      };
    }

    if (passwordScore <= 1) {
      return {
        label: "Very weak",
        textClass: "text-red-500",
        barClass: "bg-red-500",
      };
    }

    if (passwordScore === 2) {
      return {
        label: "Weak",
        textClass: "text-orange-500",
        barClass: "bg-orange-500",
      };
    }

    if (passwordScore === 3) {
      return {
        label: "Fair",
        textClass: "text-yellow-500",
        barClass: "bg-yellow-500",
      };
    }

    if (passwordScore === 4) {
      return {
        label: "Good",
        textClass: "text-blue-500",
        barClass: "bg-blue-500",
      };
    }

    return {
      label: "Strong",
      textClass: "text-green-500",
      barClass: "bg-green-500",
    };
  }, [password, passwordScore]);

  const isPasswordValid = passwordScore === 5;

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const isBusy = loading || auth.isLoading || socialLoading !== null;

  const handleSocialLogin = async (provider: Exclude<SocialProvider, null>) => {
    if (isBusy) {
      return;
    }
    setSocialLoading(provider);
    try {
      /** * Future API integration: * * POST /auth/google * POST /auth/apple * * Or use an OAuth redirect: * * window.location.href = `${API_URL}/auth/${provider}`; */

      console.log(`${provider} authentication requested`);
      toast.info(
        `${provider === "google" ? "Google" : "Apple"} registration will be connected soon.`,
      );
    } catch (err: any) {
      console.error(`${provider} authentication failed:`, err);
      toast.error(getErrorMessage(err));
    } finally {
      setSocialLoading(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState((prev) => ({ ...prev, [id]: value }));
  };

  const getFlagUrl = (iso2?: string | null) => {
    if (!iso2) {
      return null;
    }
    return `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;
  };

  const redirect =
    location.state?.from?.pathname ||
    sessionStorage.getItem("redirectAfterLogin") ||
    "/";

  useEffect(() => {
    if (user) {
      navigate(redirect, { replace: true });
    }
  }, [user, navigate, redirect]);

  useEffect(() => {
    sessionStorage.removeItem("redirectAfterLogin");
  }, []);

  const handleContinue = () => {
    if (!email.trim()) {
      toast.warning("Email is required.");
      return;
    }

    if (!password) {
      toast.warning("Password is required.");
      return;
    }

    if (!isPasswordValid) {
      toast.warning("Please meet all password requirements before continuing.");
      return;
    }

    if (!confirmPassword) {
      toast.warning("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    setState((prev) => ({ ...prev, step: 2 }));
  };

  const handleBack = () => {
    if (isBusy) {
      return;
    }
    setState((prev) => ({ ...prev, step: 1 }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password ||
      !password ||
      !confirmPassword
    ) {
      toast.warning("All fields are required.");
      return;
    }

    if (!isPasswordValid) {
      toast.warning("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    if (!selectedCountry) {
      toast.warning("Please select your country.");
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const res = await publicRequest.post("/auth", {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
        countryId: selectedCountry.id,
      });

      if (res?.data) {
        navigate("/verify", {
          state: { userId: res.data.userId, email: res.data.email },
        });
        toast.info("Please verify your email.");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error(getErrorMessage(err));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const PasswordRequirement = ({
    valid,
    children,
  }: {
    valid: boolean;
    children: React.ReactNode;
  }) => (
    <div
      className={cn(
        "flex items-center gap-2 text-xs transition-colors duration-200",
        valid ? "text-green-600 dark:text-green-500" : "text-muted-foreground",
      )}
    >
      {valid ? (
        <CircleCheck className="h-3.5 w-3.5 shrink-0" />
      ) : (
        <CircleAlert className="h-3.5 w-3.5 shrink-0" />
      )}
      <span>{children}</span>
    </div>
  );

  return (
    <>
      <SEOHead
        title="Register | TechBravery"
        description="Sign up to your TechBravery account."
        url="/register"
        noindex
      />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center py-24 px-4 bg-gradient-to-br from-background to-accent/20">
          <div className="flex flex-col gap-2 w-full max-w-md">
            <Card className="w-full max-w-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Create Account
                </CardTitle>
                <CardDescription className="text-center">
                  Join Techbravery to start your digital journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SocialLoginButtons
                  onProviderClick={handleSocialLogin}
                  loadingProvider={socialLoading}
                  disabled={isBusy}
                  showDivider
                  dividerText="Or continue with email"
                  layout="grid"
                />
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {/* ========================= STEP 1 ========================== */}
                  {step === 1 && (
                    <>
                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email"> Email </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                            className="pl-10"
                            disabled={isBusy}
                            required
                          />
                        </div>
                      </div>
                      {/* Password */}
                      <div className="space-y-2">
                        <Label htmlFor="password"> Password </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={password}
                            onChange={handleChange}
                            className="pl-10 pr-10"
                            disabled={isBusy}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={isBusy}
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() =>
                              setState((prev) => ({
                                ...prev,
                                showPassword: !prev.showPassword,
                              }))
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        {/* Password Strength */}
                        {password && (
                          <div className="space-y-3 pt-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">
                                Password strength
                              </span>
                              <span
                                className={cn(
                                  "text-xs font-semibold",
                                  passwordStrength.textClass,
                                )}
                              >
                                {passwordStrength.label}
                              </span>
                            </div>
                            {/* Strength bars */}
                            <div className="grid grid-cols-5 gap-1">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <div
                                  key={index}
                                  className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    index < passwordScore
                                      ? passwordStrength.barClass
                                      : "bg-muted",
                                  )}
                                />
                              ))}
                            </div>
                            {/* Requirements */}
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              <PasswordRequirement
                                valid={passwordRequirements.minLength}
                              >
                                At least 8 characters
                              </PasswordRequirement>
                              <PasswordRequirement
                                valid={passwordRequirements.uppercase}
                              >
                                One uppercase letter
                              </PasswordRequirement>
                              <PasswordRequirement
                                valid={passwordRequirements.lowercase}
                              >
                                One lowercase letter
                              </PasswordRequirement>
                              <PasswordRequirement
                                valid={passwordRequirements.number}
                              >
                                One number
                              </PasswordRequirement>
                              <PasswordRequirement
                                valid={passwordRequirements.special}
                              >
                                One special character
                              </PasswordRequirement>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={handleChange}
                            className={cn(
                              "pl-10 pr-10",
                              confirmPassword &&
                                (passwordsMatch
                                  ? "border-green-500 focus-visible:ring-green-500"
                                  : "border-red-500 focus-visible:ring-red-500"),
                            )}
                            disabled={isBusy}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={isBusy}
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() =>
                              setState((prev) => ({
                                ...prev,
                                showConfirmPassword: !prev.showConfirmPassword,
                              }))
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        {confirmPassword && (
                          <p
                            className={cn(
                              "text-xs",
                              passwordsMatch
                                ? "text-green-600 dark:text-green-500"
                                : "text-red-500",
                            )}
                          >
                            {passwordsMatch
                              ? "Passwords match."
                              : "Passwords do not match."}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  {/* ========================= STEP 2 ========================== */}
                  {step === 2 && (
                    <>
                      {/* Back Button */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mb-2 px-0"
                        onClick={handleBack}
                        disabled={isBusy}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
                      </Button>
                      {/* First Name */}
                      <div className="space-y-2">
                        <Label htmlFor="firstName"> First Name </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={handleChange}
                            className="pl-10"
                            disabled={isBusy}
                            required
                          />
                        </div>
                      </div>
                      {/* Last Name */}
                      <div className="space-y-2">
                        <Label htmlFor="lastName"> Last Name </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={handleChange}
                            className="pl-10"
                            disabled={isBusy}
                            required
                          />
                        </div>
                      </div>
                      {/* Country */}
                      <CountrySelect
                        value={selectedCountry}
                        onChange={setSelectedCountry}
                        label="Country"
                        placeholder="Select your country"
                        disabled={isBusy}
                        required
                      />
                    </>
                  )}
                  {/* ========================= ACTION BUTTON ========================== */}
                  {step === 1 ? (
                    <Button
                      type="button"
                      onClick={handleContinue}
                      disabled={isBusy}
                      className="w-full bg-gradient-to-r from-primary to-primary-glow disabled:cursor-not-allowed"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-primary-glow disabled:cursor-not-allowed"
                      disabled={isBusy}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Creating account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  )}
                </form>
                {/* Login Link */}
                <div className="mt-6 text-center">
                  <div className="text-sm text-muted-foreground">
                    Already have an account?
                    <Link
                      to="/login"
                      className="font-medium text-primary hover:underline"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
