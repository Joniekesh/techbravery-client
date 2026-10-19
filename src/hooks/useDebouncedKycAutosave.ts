import { useEffect, useRef, useState } from "react";
import { getErrorMessage } from "@/utils/getErrorMessage";

const DEBOUNCE_MS = 700;

interface AutosaveOptions<T> {
  enabled: boolean;
  data: T | null;
  save: (data: T) => Promise<void>;
}

export function useDebouncedAutosave<T>({
  enabled,
  data,
  save,
}: AutosaveOptions<T>) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  const saveRef = useRef(save);
  const mountedRef = useRef(true);
  const revisionRef = useRef(0);

  useEffect(() => {
    saveRef.current = save;
  }, [save]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!enabled || data === null) {
      return;
    }

    const revision = ++revisionRef.current;

    const timer = window.setTimeout(async () => {
      if (!mountedRef.current) {
        return;
      }

      setIsSaving(true);
      setSaveError(null);

      try {
        await saveRef.current(data);

        if (mountedRef.current && revision === revisionRef.current) {
          setLastSavedAt(new Date());
        }
      } catch (error) {
        if (mountedRef.current && revision === revisionRef.current) {
          setSaveError(getErrorMessage(error));
        }
      } finally {
        if (mountedRef.current && revision === revisionRef.current) {
          setIsSaving(false);
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [enabled, data]);

  return {
    isSaving,
    saveError,
    lastSavedAt,
  };
}
