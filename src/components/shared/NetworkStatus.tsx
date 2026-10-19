import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WifiOff, Wifi } from "lucide-react";

import { useNetworkStatus } from "@/hooks/useNetworkStatus";

const NetworkStatus = () => {
  const { isOnline } = useNetworkStatus();

  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowRestored(false);
      return;
    }

    // Only display restored status after a disconnect.
    setShowRestored(true);

    const timeout = window.setTimeout(() => {
      setShowRestored(false);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [isOnline]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none"
    >
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            key="offline"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center gap-2 bg-destructive px-4 py-3 text-sm font-medium text-destructive-foreground shadow-md"
            role="alert"
          >
            <WifiOff className="h-5 w-5 shrink-0" />

            <span>No internet connection. Check your network.</span>
          </motion.div>
        )}

        {isOnline && showRestored && (
          <motion.div
            key="online"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center gap-2 bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-md"
          >
            <Wifi className="h-5 w-5 shrink-0" />

            <span>Connection restored.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NetworkStatus;

// import { useNetworkStatus } from "@/hooks/useNetworkStatus";
// import { WifiOff, Wifi } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";

// const NetworkStatus = () => {
//   const { isOnline } = useNetworkStatus();

//   return (
//     <div
//       aria-live="polite"
//       aria-atomic="true"
//       className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
//     >
//       <AnimatePresence>
//         {!isOnline && (
//           <motion.div
//             key="offline"
//             initial={{ y: -60, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -60, opacity: 0 }}
//             transition={{ duration: 0.25 }}
//             className="flex items-center justify-center gap-2 bg-destructive px-4 py-3 text-sm font-medium text-destructive-foreground shadow-md"
//             role="alert"
//           >
//             <WifiOff className="h-5 w-5 shrink-0" />

//             <span>No internet connection. Check your network.</span>
//           </motion.div>
//         )}

//         {isOnline && (
//           <motion.div
//             key="online"
//             initial={{ y: -60, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -60, opacity: 0 }}
//             transition={{ duration: 0.25 }}
//             className="flex items-center justify-center gap-2 bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-md"
//           >
//             <Wifi className="h-5 w-5 shrink-0" />

//             <span>Connection restored.</span>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default NetworkStatus;
