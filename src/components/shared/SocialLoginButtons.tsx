import { Loader2 } from "lucide-react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
export type SocialProvider = "google" | "apple";
export interface SocialLoginButtonsProps {
  /** * Called when the user clicks Google or Apple. */
  onProviderClick: (provider: SocialProvider) => void;
  /** * Which provider is currently loading. * * null = no social provider is loading. */
  loadingProvider?: SocialProvider | null;
  /** * Disable the social buttons. * * Useful when email/password login is currently running. */
  disabled?: boolean;
  /** * Optional text displayed above the social buttons. * * Set to false if you don't want the divider. */
  showDivider?: boolean;
  /** * Text used in the divider. */
  dividerText?: string;
  /** * Layout of the buttons. * * "grid" = Google and Apple side-by-side * "stacked" = one button per row */
  layout?: "grid" | "stacked";
  /** * Optional className for the wrapper. */
  className?: string;
}
const SocialLoginButtons = ({
  onProviderClick,
  loadingProvider = null,
  disabled = false,
  showDivider = true,
  dividerText = "Or continue with",
  layout = "grid",
  className = "",
}: SocialLoginButtonsProps) => {
  const isBusy = disabled || loadingProvider !== null;
  return (
    <div className={className}>
      {showDivider && (
        <div className="mb-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {dividerText}
          </span>{" "}
          <div className="h-px flex-1 bg-border" />
        </div>
      )}
      <div
        className={
          layout === "grid" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3"
        }
      >
        <Button
          type="button"
          variant="outline"
          disabled={isBusy}
          onClick={() => onProviderClick("google")}
          className=" h-11 border-[#dadce0] bg-white text-[#3c4043] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f8fafd] hover:shadow-md dark:border-[#5f6368] dark:bg-[#202124] dark:text-[#e8eaed] dark:hover:bg-[#303134] "
        >
          {loadingProvider === "google" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaGoogle className="mr-2 h-4 w-4 text-[#4285F4]" />
          )}{" "}
          <span className="font-medium">Google</span>
        </Button>{" "}
        <Button
          type="button"
          variant="outline"
          disabled={isBusy}
          onClick={() => onProviderClick("apple")}
          className=" h-11 border-black bg-black text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1d1d1f] hover:shadow-md dark:border-white dark:bg-white dark:text-black dark:hover:bg-[#f5f5f7] "
        >
          {loadingProvider === "apple" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaApple className="mr-2 h-4 w-4 text-white dark:text-black" />
          )}
          <span className="font-medium">Apple</span>
        </Button>
      </div>
    </div>
  );
};
export default SocialLoginButtons;
