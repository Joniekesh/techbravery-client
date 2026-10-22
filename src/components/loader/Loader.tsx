interface LoaderProps {
  type: string;
  message?: string;
}

const Loader = ({
  type,
  message = "Preparing your experience...",
}: LoaderProps) => {
  if (type !== "bounce") return null;

  return (
    <>
      <style>
        {`
          @keyframes globe-pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.9;
            }
            50% {
              transform: scale(1.035);
              opacity: 1;
            }
          }

          @keyframes loader-fade-in {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes loading-dot {
            0%, 60%, 100% {
              transform: translateY(0);
              opacity: 0.35;
            }
            30% {
              transform: translateY(-5px);
              opacity: 1;
            }
          }

          .techbravery-loader-image {
            animation: globe-pulse 3s ease-in-out infinite;
          }

          .techbravery-loader-content {
            animation: loader-fade-in 500ms ease-out both;
          }

          .techbravery-loader-dot {
            width: 7px;
            height: 7px;
            border-radius: 9999px;
            background: #00a6a6;
            animation: loading-dot 1.2s ease-in-out infinite;
          }

          .techbravery-loader-dot:nth-child(2) {
            animation-delay: 150ms;
          }

          .techbravery-loader-dot:nth-child(3) {
            animation-delay: 300ms;
          }

          @media (prefers-reduced-motion: reduce) {
            .techbravery-loader-image,
            .techbravery-loader-content,
            .techbravery-loader-dot {
              animation: none !important;
            }
          }
        `}
      </style>

      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center
          bg-white/95 text-gray-900
          dark:bg-gray-950/95 dark:text-gray-100
          px-5 transition-colors duration-300"
        role="status"
        aria-live="polite"
        aria-label="TechBravery is loading"
      >
        <div className="techbravery-loader-content flex w-full max-w-xs flex-col items-center text-center">
          <img
            src="/techbravery-loader.png"
            alt="TechBravery digital globe"
            className="techbravery-loader-image block h-auto w-[150px] max-w-full object-contain sm:w-[200px]"
          />

          <p className="mt-3 text-sm font-medium tracking-wide text-gray-600 dark:text-gray-300">
            {message}
          </p>

          <div
            className="mt-5 flex items-center justify-center gap-2"
            aria-hidden="true"
          >
            <span className="techbravery-loader-dot" />
            <span className="techbravery-loader-dot" />
            <span className="techbravery-loader-dot" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;

// interface LoaderProps {
//   type: string;
// }

// const Loader = ({ type }: LoaderProps) => {
//   if (type !== "bounce") return null;

//   return (
//     <>
//       <style>
//         {`
//           @keyframes move {
//             0% { transform: translateY(0); }
//             100% { transform: translateY(-10px); }
//           }
//         `}
//       </style>

//       <div className="fixed inset-0 flex items-center justify-center">
//         <div
//         // className="flex flex-col items-center justify-center border-2 border-orange-500 bg-zdc-bg-primary w-20 h-20 rounded-full gap-2 p-2"
//         >
//           <div className="flex items-center gap-3">
//             <div
//               className="w-1 h-6 bg-gray-300"
//               style={{
//                 animation: "move 1s ease-in-out infinite alternate",
//                 animationDelay: "0s",
//               }}
//             />

//             <div
//               className="w-1 h-6 bg-teal-600"
//               style={{
//                 animation: "move 1s ease-in-out infinite alternate",
//                 animationDelay: "0.3s",
//               }}
//             />

//             <div
//               className="w-1 h-6 bg-gray-300"
//               style={{
//                 animation: "move 1s ease-in-out infinite alternate",
//                 animationDelay: "0.6s",
//               }}
//             />
//           </div>

//           {/* <span className="text-xs font-bold text-gray-200">Loading...</span> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Loader;
