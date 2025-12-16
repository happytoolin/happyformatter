import { getFormatter, getMinifier } from "@/handlers";
import { FileText, Minimize2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CodeMirrorThemeSelector from "./CodeMirrorThemeSelector";
import CodePlayground from "./CodePlayground";
import CodeValid from "./CodeValid";
import { useFormatterStore } from "./formatterStore";
import { ThemeProvider, useTheme } from "./ThemeContext";

interface FormatterProps {
  minifier: boolean;
  language: string;
}

function FormatButtons({
  onFormat,
  onMinify,
  onCopy,
  isProcessing,
  minifier,
}: {
  onFormat: () => void;
  onMinify: () => void;
  onCopy: () => void;
  isProcessing: boolean;
  minifier: boolean;
}) {
  const { currentTheme } = useTheme();

  const isDarkTheme = currentTheme.includes("dark");
  const iconColor = isDarkTheme ? "#ffffff" : "#000000";

  return (
    <div className="flex w-full md:w-auto gap-3">
      {minifier && (
        <button
          onClick={onMinify}
          disabled={isProcessing}
          className="flex-1 md:flex-none h-12 min-w-[120px] px-6 font-display uppercase tracking-wider text-sm border-2 border-foreground bg-transparent hover:bg-secondary transition-all duration-300 ease-in-out active:translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          aria-label="Minify code (Ctrl+Shift+M)"
          title="Minify code (Ctrl+Shift+M)"
        >
          <Minimize2
            size={16}
            strokeWidth={2}
            className="text-current transition-transform duration-300"
          />
          <span>MINIFY</span>
        </button>
      )}

      <button
        onClick={onFormat}
        disabled={isProcessing}
        className="flex-1 md:flex-none h-12 min-w-[120px] px-6 font-display uppercase tracking-wider text-sm border-2 border-foreground bg-primary text-white hover:bg-primary/90 transition-all duration-300 ease-in-out shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2"
        aria-label="Format code (Ctrl+Shift+F)"
        title="Format code (Ctrl+Shift+F)"
      >
        <FileText
          size={16}
          strokeWidth={2}
          style={{ color: iconColor }}
          className="transition-transform duration-300"
        />
        <span>FORMAT</span>
      </button>

      <button
        onClick={onCopy}
        className="h-12 w-12 flex items-center justify-center border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
        aria-label="Copy formatted code"
        title="Copy formatted code"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
  );
}

export default function Formatter({ minifier, language }: FormatterProps) {
  const { code, setCode, initializeCode, setLanguage } = useFormatterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  useEffect(() => {
    setLanguage(language);
    initializeCode(language);
  }, [language, setLanguage, initializeCode]);

  const handleAction = useCallback(async (type: "format" | "minify") => {
    setIsProcessing(true);
    try {
      if (type === "format") {
        const formatter = await getFormatter(language);
        const result = await formatter.formatCode(code);
        setCode(result);
        setLastAction("FORMAT_SUCCESS");
      } else {
        const minifierTool = await getMinifier(language);
        if (minifierTool) {
          const result = await minifierTool.minifyCode(code);
          setCode(result);
          setLastAction("MINIFY_SUCCESS");
        } else {
          setLastAction("MINIFIER_NOT_AVAILABLE");
        }
      }
    } catch (e) {
      console.error(e);
      setLastAction("ERR_EXECUTION_FAILED");
    } finally {
      setIsProcessing(false);
      setTimeout(() => setLastAction(null), 2000);
    }
  }, [language, code, setCode]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setLastAction("COPIED_TO_CLIPBOARD");
    } catch {
      setLastAction("COPY_FAILED");
    }
    setTimeout(() => setLastAction(null), 2000);
  }, [code]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable === "true") {
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        handleAction("format");
      } else if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "m") {
        event.preventDefault();
        handleAction("minify");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleAction]);

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full relative">
        {/* Dashed Grid */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e7e5e4 1px, transparent 1px),
              linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              )
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              )
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        <div className="w-full py-12 border-b-2 border-foreground relative z-10" id="workspace">
          <div className="container mx-auto px-4">
            <div className="border-4 border-foreground bg-card relative shadow-[10px_10px_0px_0px_rgba(13,13,13,1)] dark:shadow-[10px_10px_0px_0px_#ffffff]">
              <div className="flex flex-col md:flex-row justify-between items-center border-b-2 border-foreground bg-muted/20 p-2 gap-2">
                <div className="flex items-center gap-4 px-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary border border-black"></div>
                    <div className="w-3 h-3 rounded-full bg-transparent border-2 border-accent"></div>
                    <div className="w-3 h-3 rounded-full bg-transparent border border-black"></div>
                  </div>
                  <span className="font-mono text-xs font-bold uppercase">{language.toUpperCase()}__SOURCE</span>
                </div>

                <div className="flex items-center gap-4">
                  <CodeValid language={language} />
                  <CodeMirrorThemeSelector className="hidden md:flex" />
                </div>
              </div>

              <div className="relative h-[400px] md:h-[600px] w-full bg-card">
                <CodePlayground
                  inputCode={code}
                  language={language}
                  onCodeChange={setCode}
                />

                {lastAction && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
                    <div className="bg-primary text-black font-display text-4xl uppercase px-4 py-2 border-2 border-black -rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      {lastAction}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-foreground p-4 bg-background flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="font-mono text-[10px] text-muted-foreground hidden md:block">
                  CPU: LOCAL / WASM <br /> MEMORY: OPTIMIZED
                </div>

                <FormatButtons
                  onFormat={() => handleAction("format")}
                  onMinify={() => handleAction("minify")}
                  onCopy={copyToClipboard}
                  isProcessing={isProcessing}
                  minifier={minifier}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
