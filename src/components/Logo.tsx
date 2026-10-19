import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  size?: LogoSize;
  className?: string;
  homeLink?: boolean;
  iconOnly?: boolean;
  alt?: string;
}

const logoSizes: Record<LogoSize, string> = {
  sm: "h-7",
  md: "h-9",
  lg: "h-12",
  xl: "h-16",
};

export const Logo = ({
  size = "md",
  className = "",
  homeLink = true,
  iconOnly = false,
  alt = "Techbravery",
}: LogoProps) => {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const logoSrc = iconOnly
    ? isDark
      ? "/logo-dark-icon.png"
      : "/logo-light-icon.png"
    : isDark
      ? "/logo-dark3.png"
      : "/logo-light3.png";

  const image = (
    <img
      src={logoSrc}
      alt={alt}
      draggable={false}
      className={[
        "block w-auto max-w-full object-contain",
        logoSizes[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );

  if (!homeLink) {
    return image;
  }

  return (
    <Link
      to="/"
      aria-label="Techbravery homepage"
      className="inline-flex min-w-0 items-center"
    >
      {image}
    </Link>
  );
};
