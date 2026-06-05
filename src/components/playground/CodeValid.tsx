import { getFormatter } from "@/handlers";
import { useEffect, useRef, useState } from "react";
import { useFormatterStore } from "./formatterStore";

interface CodeValidProps {
  language: string;
}

export default function CodeValid({ language }: CodeValidProps) {
  const code = useFormatterStore((state) => state.code);
  const [status, setStatus] = useState<"IDLE" | "CHECKING" | "VALID SYNTAX" | "SYNTAX ERROR" | "READY">("CHECKING");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkCodeValidity = async () => {
      if (!code || code.trim() === "") {
        setStatus("IDLE");
        return;
      }

      try {
        const formatter = await getFormatter(language);

        if (formatter && typeof formatter.validateCode === "function") {
          const isValid = await formatter.validateCode(code);
          setStatus(isValid ? "VALID SYNTAX" : "SYNTAX ERROR");
        } else {
          setStatus("READY");
        }
      } catch (error) {
        console.error("Error checking code validity:", error);
        setStatus("READY");
      }
    };

    // Debounce the validity check
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      checkCodeValidity();
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [code, language]);

  const getStatusColor = () => {
    switch (status) {
      case "VALID SYNTAX":
        return "text-foreground";
      case "SYNTAX ERROR":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusDotClass = () => {
    switch (status) {
      case "VALID SYNTAX":
        return "h-2 w-2 rounded-full bg-foreground";
      case "SYNTAX ERROR":
        return "h-2 w-2 rounded-full bg-destructive";
      case "IDLE":
        return "h-2 w-2 rounded-full bg-muted-foreground";
      default:
        return "h-2 w-2 rounded-full border border-muted-foreground";
    }
  };

  return (
    <div className="flex items-center">
      <span className="flex h-9 items-center gap-2 rounded-md border border-border bg-background px-2.5 font-mono text-xs uppercase">
        <span className="text-muted-foreground">Check</span>
        <span className={getStatusColor()}>{status}</span>
        <span
          className={getStatusDotClass()}
          aria-hidden="true"
        >
        </span>
      </span>
      {/* Screen reader-only status announcement */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Code check: {status}
      </div>
    </div>
  );
}
