import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useNotificationsSSE = (url: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!url) return;

    const eventSource = new EventSource(`${url}/notifications/stream`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data);
        console.log("📩 New Notification via SSE", notification);

        // ✅ Update react-query cache immediately
        queryClient.setQueryData(["notifications"], (old: any) => {
          if (!old) return [notification];
          return [notification, ...old];
        });
      } catch (err) {
        console.error("SSE Parse Error:", err);
      }
    };

    eventSource.onerror = (error) => {
      console.error("❌ SSE Error", error);
      // Optional: reconnect logic if needed
    };

    return () => {
      eventSource.close();
    };
  }, [url, queryClient]);
};
