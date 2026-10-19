import { Copy } from "lucide-react";

export function AdminMetaCard({ client }: { client: any }) {
  return (
    <div className="p-4 space-y-4 text-sm">
      <Meta label="User ID:" value={client.id} copy />
      <Meta label="Status:" value={client.status} />
      <Meta label="Role:" value={client.role} />
      <Meta label="Auth Type:" value={client.authType} />
      <Meta label="Email Verified:" value={String(client.iSEmailVerified)} />
      <Meta
        label="Last Login:"
        value={new Date(client.lastLoginDetails?.time).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })}
      />
    </div>
  );
}

function Meta({
  label,
  value,
  copy,
}: {
  label: string;
  value: string;
  copy?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1 font-medium">
        {value}
        {copy && (
          <Copy
            size={14}
            className="cursor-pointer"
            onClick={() => navigator.clipboard.writeText(value)}
          />
        )}
      </span>
    </div>
  );
}
