// components/admin/AdminStats.tsx
export function AdminStats({ client }: { client: any }) {
  const totalSpent =
    client.projects?.reduce(
      (acc: number, p: any) => acc + (p.amountSpent ?? 0),
      0,
    ) ?? 0;

  const active = client.projects?.filter(
    (p: any) => p.status === "IN_PROGRESS",
  ).length;

  const completed = client.projects?.filter(
    (p: any) => p.status === "COMPLETED",
  ).length;

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <Stat label="Total Spent" value={`₦${totalSpent.toLocaleString()}`} />
      <Stat label="Active Projects" value={active} />
      <Stat label="Completed Projects" value={completed} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="border rounded-md p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
