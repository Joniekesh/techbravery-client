import { useEffect, useState } from "react";

interface LoaderProps {
  type: string;
}

const getIsDark = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

const Loader = ({ type }: LoaderProps) => {
  const [isDark, setIsDark] = useState(getIsDark);
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      setIsDark(root.classList.contains("dark"));
      setThemeReady(true);
    };

    // Load both assets early to avoid image-loading flashes.
    const lightLogo = new Image();
    lightLogo.src = "/logo-light-icon.png";

    const darkLogo = new Image();
    darkLogo.src = "/logo-dark-icon.png";

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (type !== "bounce" || !themeReady) return null;

  const iconSrc = isDark ? "/logo-dark-icon.png" : "/logo-light-icon.png";

  return (
    <>
      <style>
        {`
          @keyframes icon-pulse {
            0%, 100% {
              transform: scale(0.92);
              filter: drop-shadow(
                0 0 4px rgba(0, 184, 176, 0.2)
              );
            }

            50% {
              transform: scale(1.08);
              filter: drop-shadow(
                0 0 16px rgba(0, 184, 176, 0.55)
              );
            }
          }

          @keyframes loader-fade-in {
            from {
              opacity: 0;
              transform: translateY(12px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .techbravery-loader-content {
            animation: loader-fade-in 600ms ease-out both;
          }

          .techbravery-loader-icon {
            animation: icon-pulse 1.8s ease-in-out infinite;
            transform-origin: center;
            will-change: transform, filter;
          }

          @media (prefers-reduced-motion: reduce) {
            .techbravery-loader-content,
            .techbravery-loader-icon {
              animation: none !important;
            }

            .techbravery-loader-icon {
              transform: none;
              filter: none;
            }
          }
        `}
      </style>

      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-colors duration-300 dark:bg-gray-950"
        role="status"
        aria-label="TechBravery is loading"
      >
        <div className="techbravery-loader-content flex items-center justify-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-teal-500/20 bg-teal-500/5 sm:h-28 sm:w-28">
            <img
              key={iconSrc}
              src={iconSrc}
              alt="TechBravery"
              className="techbravery-loader-icon block h-[82%] w-[82%] rounded-full object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
