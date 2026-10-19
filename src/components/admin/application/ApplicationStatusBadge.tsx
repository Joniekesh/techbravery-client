import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ApplicationStatusBadgeProps {
  status: string;
  isLive?: boolean;
}

export function ApplicationStatusBadge({
  status,
  isLive,
}: ApplicationStatusBadgeProps) {
  if (isLive) {
    return (
      <Badge
        className={cn(
          "border border-primary/20",
          "bg-primary/10 text-primary",
          "hover:bg-primary/15",
        )}
      >
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        Live
      </Badge>
    );
  }

  const normalized = status.toLowerCase().replace(/_/g, " ");

  return (
    <Badge variant="outline" className="capitalize">
      {normalized}
    </Badge>
  );
}
