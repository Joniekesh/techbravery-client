import { AlertTriangle, Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteApplicationDialogProps {
  open: boolean;
  applicationName?: string;
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteApplicationDialog({
  open,
  applicationName,
  loading,
  onOpenChange,
  onConfirm,
}: DeleteApplicationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div
            className="
              mb-2 flex h-11 w-11 items-center
              justify-center rounded-full
              bg-destructive/10
              text-destructive
            "
          >
            <AlertTriangle className="h-5 w-5" />
          </div>

          <AlertDialogTitle>Delete application?</AlertDialogTitle>

          <AlertDialogDescription>
            This will soft-delete{" "}
            <strong>{applicationName || "this application"}</strong>. The
            application will no longer appear publicly and can be restored by an
            administrator.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(event) => {
              event.preventDefault();
              onConfirm();
            }}
            className="
              bg-destructive
              text-destructive-foreground
              hover:bg-destructive/90
            "
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
