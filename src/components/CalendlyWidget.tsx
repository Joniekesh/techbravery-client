import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface CalendlyWidgetProps {
  url?: string;
  variant?: "inline" | "popup";
  buttonText?: string;
}

const CalendlyWidget = ({
  url = "https://calendly.com/techbravery-demo", // Replace with actual Calendly URL
  variant = "popup",
  buttonText = "Schedule a Consultation",
}: CalendlyWidgetProps) => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const calendlyScript = document.querySelector('script[src*="calendly"]');
      if (calendlyScript) {
        calendlyScript.remove();
      }
    };
  }, []);

  const openCalendlyPopup = () => {
    // @ts-ignore - Calendly is loaded globally
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url });
    }
  };

  if (variant === "inline") {
    return (
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: "320px", height: "580px" }}
      ></div>
    );
  }

  return (
    <Button onClick={openCalendlyPopup} className="gap-2" size="lg">
      <Calendar className="w-4 h-4" />
      {buttonText}
    </Button>
  );
};

// Demo Scheduling Component
export const DemoScheduler = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>30-minute demo session</span>
      </div>
      <CalendlyWidget
        buttonText="Schedule a Demo"
        url="https://calendly.com/techbravery-demo/30min"
      />
      <p className="text-sm text-muted-foreground">
        See our platforms in action and discuss your project needs
      </p>
    </div>
  );
};

// Consultation Scheduling Component
export const ConsultationScheduler = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>60-minute consultation</span>
      </div>
      <CalendlyWidget
        buttonText="Book Free Consultation"
        url="https://calendly.com/techbravery-consultation/60min"
      />
      <p className="text-sm text-muted-foreground">
        Free strategy session to discuss your digital transformation needs
      </p>
    </div>
  );
};

export default CalendlyWidget;
