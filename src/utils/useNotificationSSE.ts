import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useNotificationSSE() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const es = new EventSource(
      `${import.meta.env.VITE_API_BASE_URL}/notification/stream`,
      { withCredentials: true },
    );

    es.onmessage = (event) => {
      const notificationId = event.data;
      console.log(event);

      // 🔁 Invalidate notification queries
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["my-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    };

    es.onerror = () => {
      es.close();
    };

    return () => es.close();
  }, [queryClient]);
}
