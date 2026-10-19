import { Button } from "@/components/ui/button";

interface Props {
  onSuspend?: () => void;
  onImpersonate?: () => void;
}

export function AdminActionBar({ onSuspend, onImpersonate }: Props) {
  return (
    <div className="sticky top-0 z-10 mb-4 flex justify-end gap-2 bg-white p-3 border rounded-md">
      <Button variant="destructive" onClick={onSuspend}>
        Suspend Client
      </Button>
      <Button variant="secondary" onClick={onImpersonate}>
        Impersonate
      </Button>
    </div>
  );
}
