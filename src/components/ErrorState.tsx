import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type ErrorStateProps = {
  error?: unknown;
  onRetry?: () => Promise<void> | void;
  title?: string;
  className?: string;
};

export function ErrorState({
  error,
  onRetry,
  title = "Something went wrong",
  className,
}: ErrorStateProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const getErrorMessage = () => {
    if (!error) return "An unexpected error occurred. Please try again.";

    if (typeof error === "string") return error;

    if (error instanceof Error) return error.message;

    if (typeof error === "object" && "message" in (error as any)) {
      return (error as any).message;
    }

    return "An unexpected error occurred. Please try again.";
  };

  const handleRetry = async () => {
    if (!onRetry) return;

    try {
      setIsRetrying(true);
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center rounded-2xl bg-background p-8 text-center shadow-sm mt-8",
        className,
      )}
    >
      {/* Icon */}
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertTriangle className="h-10 w-10" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {getErrorMessage()}
      </p>

      {/* Actions */}
      {onRetry && (
        <div className="mt-6">
          <Button
            onClick={handleRetry}
            disabled={isRetrying}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={cn("h-4 w-4", isRetrying && "animate-spin")}
            />
            {isRetrying ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      )}
    </div>
  );
}
