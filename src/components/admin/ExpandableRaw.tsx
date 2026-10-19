// components/admin/ExpandableRaw.tsx
import { useState } from "react";

export function ExpandableRaw({ data }: { data: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button onClick={() => setOpen(!open)} className="text-sm text-blue-600">
        {open ? "Hide Raw Data" : "View Raw Data"}
      </button>

      {open && (
        <pre className="mt-2 max-h-64 overflow-auto rounded bg-gray-100 p-3 text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
