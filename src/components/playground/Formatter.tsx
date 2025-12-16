import { getFormatter, getMinifier } from "@/handlers";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CodeMirrorThemeSelector from "./CodeMirrorThemeSelector";
import CodePlayground from "./CodePlayground";
import CodeValid from "./CodeValid";
import { useFormatterStore } from "./formatterStore";
import { ThemeProvider } from "./ThemeContext";

interface FormatterProps {
  minifier: boolean;
  language: string;
}

export default function Formatter({ minifier, language }: FormatterProps) {
  const { code, setCode, initializeCode, setLanguage } = useFormatterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonFeedback, setButtonFeedback] = useState<{ format?: string; minify?: string }>({});
  const formatButtonRef = useRef<HTMLButtonElement>(null);
  const minifyButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setLanguage(language);
    initializeCode(language);
  }, [language, setLanguage, initializeCode]);

  const showFeedback = useCallback((buttonType: "format" | "minify", text: string) => {
    setButtonFeedback(prev => ({ ...prev, [buttonType]: text }));
    setTimeout(() => {
      setButtonFeedback(prev => ({ ...prev, [buttonType]: undefined }));
    }, 1500);
  }, []);

  const handleFormat = useCallback(async () => {
    try {
      setIsProcessing(true);
      const formatter = await getFormatter(language);
      const result = await formatter.formatCode(code);
      setCode(result);
      showFeedback("format", "DONE");
    } catch (error) {
      showFeedback("format", "ERROR");
    } finally {
      setIsProcessing(false);
    }
  }, [code, language, showFeedback]);

  const handleMinify = useCallback(async () => {
    try {
      setIsProcessing(true);
      const minifier = await getMinifier(language);
      if (minifier) {
        const result = await minifier.minifyCode(code);
        setCode(result);
        showFeedback("minify", "MINIFIED");
      }
    } catch (error) {
      showFeedback("minify", "ERROR");
    } finally {
      setIsProcessing(false);
    }
  }, [code, language, showFeedback]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    if (copyButtonRef.current) {
      copyButtonRef.current.classList.add("bg-accent");
      setTimeout(() => {
        copyButtonRef.current?.classList.remove("bg-accent");
      }, 500);
    }
  }, [code]);

  return (
    <ThemeProvider>
      <div className="w-full bg-background py-12" data-language={language} id="formatter">
        <div className="container mx-auto max-w-6xl">
          {/* The Machine Housing */}
          <div className="relative border-2 border-foreground bg-card shadow-[8px_8px_0px_0px_var(--color-foreground)]">
            {/* Machine Header / Toolbar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-foreground bg-secondary p-4 gap-4">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full border border-foreground bg-primary"></div>
                  <div className="w-3 h-3 rounded-full border border-foreground bg-[#10B981]"></div>
                </div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Editor // {language.toUpperCase()}
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <CodeMirrorThemeSelector />
                <CodeValid language={language} />
              </div>
            </div>

            {/* The Single Editor Pane */}
            <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden group">
              <CodePlayground
                inputCode={code}
                language={language}
                onCodeChange={setCode}
              />
            </div>

            {/* Control Deck */}
            <div className="border-t-2 border-foreground p-4 bg-background grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="text-[10px] font-mono text-muted-foreground hidden md:block">
                READY TO PROCESS. <br /> PRESS ACTION TO EXECUTE.
              </div>

              <div className="flex flex-col md:flex-row gap-3 justify-end">
                {minifier && (
                  <button
                    ref={minifyButtonRef}
                    onClick={handleMinify}
                    disabled={isProcessing}
                    className="w-full md:w-auto px-4 py-2 bg-background border-2 border-foreground hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm font-bold uppercase tracking-widest"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                      {buttonFeedback.minify || "MINIFY"}
                    </span>
                  </button>
                )}

                <button
                  ref={formatButtonRef}
                  onClick={handleFormat}
                  disabled={isProcessing}
                  className="w-full md:w-auto px-4 py-2 bg-primary hover:bg-primary/90 text-black border-2 border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm font-bold uppercase tracking-widest"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    {buttonFeedback.format || "FORMAT CODE"}
                  </span>
                </button>

                <button
                  ref={copyButtonRef}
                  onClick={handleCopy}
                  className="w-10 h-10 p-0 bg-background border-2 border-transparent hover:border-foreground transition-colors"
                  title="Copy to Clipboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Footer for the Machine */}
          <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground uppercase">
            <span>REF: {language.toUpperCase()}-FMT-001</span>
            <span>LATENCY: 0ms (LOCAL)</span>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
