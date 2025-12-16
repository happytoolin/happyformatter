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
        return "text-green-600";
      case "SYNTAX ERROR":
        return "text-red-600";
      default:
        return "";
    }
  };

  const getStatusDotClass = () => {
    switch (status) {
      case "VALID SYNTAX":
        return "w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)]";
      case "SYNTAX ERROR":
        return "w-2 h-2 rounded-full bg-red-500 animate-pulse";
      case "IDLE":
        return "w-2 h-2 rounded-full bg-gray-400";
      default:
        return "w-2 h-2 rounded-full bg-primary";
    }
  };

  return (
    <div className="flex items-center">
      <span
        className="font-mono text-[10px] font-bold uppercase flex items-center gap-2 px-2 py-1 bg-muted border border-border"
        role="status"
        aria-live="polite"
        aria-label={`Code validation status: ${status}`}
      >
        STATUS: <span className={getStatusColor()}>{status}</span>
        <span
          className={getStatusDotClass()}
          aria-hidden="true"
        >
        </span>
      </span>
      {/* Additional screen reader-only status announcement */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Code validation status is {status}
      </div>
    </div>
  );
}
